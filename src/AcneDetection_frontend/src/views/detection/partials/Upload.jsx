import React, { useEffect, useState } from "react";
import { message, Popconfirm } from "antd";
import Button from "../../../component/Button/Button";
import UploadModal from "./UploadModal";
import { GrGallery } from "react-icons/gr";

const Upload = ({imageRef, setOriginalImage, disabled}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [imgData, setImgData] = useState(false);

    const handleOpenUpload = () => {
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
        setFileList([]);
    };


    const handleUpload = async () => {
        if (fileList.length === 0) {
            message.error('No image selected');
            return;
        }
        imageRef.current.src = imgData;

        imageRef.current.style.display="block";
        handleClose();
    };

    const handleFileChange = ({ fileList }) => {
        // Limit the number of uploaded files to one
        setFileList(fileList.slice(-1));
        const url = URL.createObjectURL(imgData);
        setOriginalImage(url);
        setImgData(url);
    };

    return (
        <>
            <Popconfirm
                title="Upload Image"
                description="Do you want upload image?"
                onConfirm={handleOpenUpload}
                okText="Yes"
                cancelText="No"
                placement="top"
            >
                <Button className="flex gap-2 items-center justify-center text-base w-40 rounded-full" primary disabled={disabled}>
                    <GrGallery/> 
                    Gallery
                </Button>
            </Popconfirm>
            <UploadModal
                modalOpen={modalOpen}
                handleClose={handleClose}
                handleUpload={handleUpload}
                fileList={fileList}
                setImgData={setImgData}
                handleFileChange={handleFileChange}
            />
        </>
    );
};

export default Upload;