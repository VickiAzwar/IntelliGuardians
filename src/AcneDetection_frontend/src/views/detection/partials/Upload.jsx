import React, { useState } from "react";
import { message, Popconfirm } from "antd";
import Button from "../../../component/Button/Button";
import { UploadOutlined } from "@ant-design/icons";
import UploadModal from "./UploadModal";
import { createActor } from '../../../actorBackend/createActor';

const Upload = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);


    const handleOpenUpload = () => {
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
        setFileList([]);
    };

    const convertFileToBlob = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const arrayBuffer = reader.result;
                const blob = new Uint8Array(arrayBuffer);
                resolve(blob);
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    };


    const handleUpload = async () => {
        if (fileList.length === 0) {
            message.error('No image selected');
            return;
        }

        const file = fileList[0].originFileObj;
        const filename = file.name
        console.log("file: ", file)
        setUploading(true);

        try {
            const blob = await convertFileToBlob(file);
            const actor = await createActor();
            const result = await actor.upload_image(blob, filename);
            message.success(result);
        } catch (error) {
            console.error("Upload error: ", error);
            message.error("Failed to upload image");
        } finally {
            setUploading(false);
            setFileList([]); // Reset fileList setelah upload selesai
        }


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
