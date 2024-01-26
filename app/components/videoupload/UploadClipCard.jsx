import React, { useEffect, useState, useRef } from "react";
import { videouploadState, videouploadAction } from "./videoupload.slice";
import { useAppSelector, useAppDispatch } from "../../store";
import Modal from "../../common/modal";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { getS3SignUrl } from "./videoupload.api";
import { LIST_OF_ACCOUNT_TYPE } from "../../common/constants";
import { getMasterData } from "../master/master.api";
import axios from "axios";
import { X } from "react-feather";
import { toast } from "react-toastify";

const UploadClipCard = () => {

    const [selectedFile, setSelectedFile] = useState(null)
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState({})
    const [categoryList, setCategoryList] = useState([])
    const ref = useRef();
    const dispatch = useAppDispatch()
    const [progress, setProgress] = useState(0);
    const { isOpen } = useAppSelector(videouploadState)


    const handleFileChange = (e) => {
        if (e.target.files) {
            const file = e.target.files[0];
            const fileSize = file?.size / 1024 / 1024; // in MiB
            if (fileSize > 150) {
                ref.current.value = "";
                alert('File size exceeds 50 MiB');
            } else {
                setSelectedFile(file)
            }
        }
    }

    const handleUpload = async () => {
        if (!selectedFile) {
            toast.error("Please select a video file.");
            return;
        }
        var payload = { filename: selectedFile?.name, fileType: selectedFile?.type, title: title, category: category };
        const data = await getS3SignUrl(payload);
        if (data?.url) {
            await pushProfilePhotoToS3(data.url, selectedFile);
            // Create a new file input element
            const newFileInput = document.createElement("input");
            newFileInput.type = "file";
            newFileInput.id = "fileUpload";
            newFileInput.name = "file";
            newFileInput.style.width = "67%";
            // Replace the existing file input with the new one
            const existingFileInput = document.getElementById("fileUpload");
            existingFileInput.parentNode.replaceChild(newFileInput, existingFileInput);
        }
    }

    async function pushProfilePhotoToS3(presignedUrl, uploadPhoto) {
        const myHeaders = new Headers({ 'Content-Type': 'image/*' });
        axios.put(presignedUrl, uploadPhoto, {
            headers: myHeaders,
            onUploadProgress: progressEvent => {
                const { loaded, total } = progressEvent;
                const percentCompleted = (loaded / total) * 100;
                setProgress(Math.trunc(percentCompleted === 100 ? 0 : percentCompleted))
            },
        }).then(response => {
            dispatch(videouploadAction.uploadVideoS3(selectedFile));
            console.log(response);
        }).catch(error => {
            console.error('Error:', error);
        });
    }

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

    useEffect(() => {
        getCategoryData();
    }, []);

    useEffect(() => {
        if (progress == 100) {
            dispatch(videouploadAction?.setIsOpen(false));
        }
    }, [progress])

    useEffect(() => {
        if (!isOpen) {
            setTitle("");
            setCategory({});
            setSelectedFile(false);
            setProgress(0)
        }
    }, [isOpen])

    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <h2>Upload Clip</h2>
            <div className="form-group" style={{ color: "black" }}>
                <label className="col-form-label">Title</label>
                <input

                    disabled={progress}
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

                    disabled={progress}
                    id="account_type"
                    className="form-control"
                    name="account_type"
                    onChange={(e) => setCategory(e?.target?.value)}
                    defaultValue={category}
                >
                    <option>Choose Category</option>
                    {categoryList?.map((category_type, index) => <option key={index} value={category_type.label}>  {category_type.label}</option>)}
                </select>
                <div style={{ textAlign: 'center' }}>
                    <label className="col-form-label mt-2">Select a clip to upload: &nbsp;</label>
                    <input disabled={progress} ref={ref} type="file" name="file" id="fileUpload" onChange={handleFileChange} style={{ width: '67%' }} />
                </div>

            </div>
            <div className="d-flex justify-content-center">
                <Button className="mx-3" color="primary" onClick={handleUpload}>Upload</Button>
            </div>
            <label style={{ color: "black" }} className="col-form-label mt-2" htmlFor="account_type">
                {progress ? <> Uploading... {progress}%</> : <></>}
            </label>
        </div>
    )
}

export default UploadClipCard