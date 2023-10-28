import React, { useEffect, useState } from "react";
import { videouploadState,videouploadAction } from "./videoupload.slice";
import {  useAppSelector ,useAppDispatch} from "../../store";
import Modal from "../../common/modal";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const VideoUpload = (props) => {
    const { isOpen } = useAppSelector(videouploadState);
    const dispatch = useAppDispatch();

    const [selectedFile, setSelectedFile] = useState(null)

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0])
    }

    const handleUpload = () => {
        dispatch(videouploadAction.uploadVideoS3(selectedFile));
    }

    return (<Modal
        width={440}
        isOpen={isOpen}
        element={<div className="d-flex flex-column align-items-center p-3 justify-content-center h-100">
            <h2>Clip Upload</h2>
                <Label for="fileUpload">Select a clip to upload:</Label>
                <Input type="file" name="file" id="fileUpload" onChange={handleFileChange} />
            <div className="d-flex justify-content-around w-100 p-3">
                <Button color="primary" disabled={!selectedFile} onClick={handleUpload}>Upload</Button>
                <Button color="secondary" onClick={() => dispatch(videouploadAction.setIsOpen(false))}>Close</Button>
            </div>
        </div>
        
    }
          
    />)
}
export default VideoUpload;
