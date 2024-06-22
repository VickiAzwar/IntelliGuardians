import React, { useState } from "react";
import { message, Popconfirm } from "antd";
import Button from "../../../component/Button/Button";
import { UploadOutlined } from "@ant-design/icons";
import UploadModal from "./UploadModal";

const Upload = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [fileList, setFileList] = useState([]);

    const handleOpenUpload = () => {
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
        setFileList([]);
    };

    const handleUpload = () => {
        message.success('Image uploaded successfully!');
        handleClose();
    };

    const handleFileChange = ({ fileList }) => {
        // Limit the number of uploaded files to one
        setFileList(fileList.slice(-1));
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
                <Button className="text-base w-40" primary>
                    <UploadOutlined className="pr-2" /> Gallery
                </Button>
            </Popconfirm>
            <UploadModal
                modalOpen={modalOpen}
                handleClose={handleClose}
                handleUpload={handleUpload}
                fileList={fileList}
                handleFileChange={handleFileChange}
            />
        </>
    );
};

export default Upload;
