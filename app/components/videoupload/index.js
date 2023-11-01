import React, { useEffect, useState } from "react";
import { videouploadState, videouploadAction } from "./videoupload.slice";
import { useAppSelector, useAppDispatch } from "../../store";
import Modal from "../../common/modal";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { getS3SignUrl } from "./videoupload.api";
import { LIST_OF_ACCOUNT_TYPE } from "../../common/constants";
import { getMasterData } from "../master/master.api";
import axios from "axios";

const VideoUpload = (props) => {
    const { isOpen } = useAppSelector(videouploadState);
    const dispatch = useAppDispatch();
    const [selectedFile, setSelectedFile] = useState(null)
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState({})
    const [categoryList, setCategoryList] = useState([])
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        getCategoryData()
    }, [])

    useEffect(() => {
        if (isOpen) setProgress(0)
    }, [isOpen])

    const getCategoryData = async () => {
        var res = await getMasterData()
        setCategoryList(res?.data?.data[0]?.category?.map((val, ind) => {
            return {
                id: ind,
                label: val,
                value: val,
            }
        }))
    }

    const handleFileChange = (e) => {
        if (e.target.files) {
            const file = e.target.files[0];
            const fileLink = URL.createObjectURL(file);
            setSelectedFile(file)
        }
    }

    const handleUpload = async () => {
        var payload = { filename: selectedFile?.name, fileType: selectedFile?.type, title: title, category: category };
        const data = await getS3SignUrl(payload);
        if (data?.url) await pushProfilePhotoToS3(data.url, selectedFile);
    }

    async function pushProfilePhotoToS3(presignedUrl, uploadPhoto) {
        const myHeaders = new Headers({ 'Content-Type': 'image/*' });
        axios.put(presignedUrl, uploadPhoto, {
            headers: myHeaders,
            onUploadProgress: progressEvent => {
                const { loaded, total } = progressEvent;
                const percentCompleted = (loaded / total) * 100;
                setProgress(Math.trunc(percentCompleted))
            },
        }).then(response => {
            dispatch(videouploadAction.uploadVideoS3(selectedFile));
            console.log(response);
        }).catch(error => {
            console.error('Error:', error);
        });
    }

    return (<Modal
        width={440}
        isOpen={isOpen}
        element={
            <div className="d-flex flex-column align-items-center p-3 justify-content-center h-100">
                <h2>Clip Upload</h2>
                <div className="form-group">
                    <label className="col-form-label mt-2">Title</label>
                    <input
                        className="form-control"
                        type="text"
                        name="fullname"
                        placeholder="Title"
                        onChange={(e) => setTitle(e?.target?.value)}
                        defaultValue={title}
                    />
                    <label className="col-form-label mt-2" htmlFor="account_type">
                        Choose Category
                    </label>
                    <select
                        id="account_type"
                        className="form-control"
                        name="account_type"
                        onChange={(e) => setCategory(e?.target?.value)}
                        defaultValue={category}
                    >
                        <option>Choose Category</option>
                        {categoryList.map((category_type, index) => <option key={index} value={category_type.label}>  {category_type.label}</option>)}
                    </select>
                    <label className="col-form-label mt-2">Select a clip to upload:</label>
                    <input type="file" name="file" id="fileUpload" onChange={handleFileChange} />
                </div>
                <div className="d-flex justify-content-around w-100 p-3">
                    <Button color="primary" disabled={!selectedFile} onClick={handleUpload}>Upload</Button>
                    <Button color="secondary" onClick={() => dispatch(videouploadAction.setIsOpen(false))}>Close</Button>
                </div>
                <label className="col-form-label mt-2" htmlFor="account_type">
                    {progress ? <> Uploading... {progress}%</> : <></>}
                </label>
            </div>
        }
    />)
}
export default VideoUpload;
