import React from 'react';
import { Modal, message, Button, Upload } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const UploadModal = ({ modalOpen, handleClose, handleUpload, fileList, handleFileChange }) => {
  const props = {
    name: 'file',
    multiple: false, // Only allow one file to be uploaded
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    listType: 'picture',
    beforeUpload: (file) => {
        const isImage = file.type === 'image/png' || file.type === 'image/jpeg';
        if (!isImage) {
          message.error('You can only upload PNG or JPG files!');
          return Upload.LIST_IGNORE;
        }
      return false;
    },
    onChange: handleFileChange,
    fileList, // Controlled fileList
  };

  return (
    <Modal
      title="Upload Your Image"
      centered
      open={modalOpen}
      onCancel={handleClose}
      footer={[
        <Button key="back" onClick={handleClose}>
          Close
        </Button>,
        <Button key="upload" type="primary" onClick={handleUpload} disabled={fileList.length === 0}>
          <UploadOutlined className="pr-2" /> Upload
        </Button>
      ]}
    >
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
        Accepts only PNG and JPG files.
        </p>
      </Dragger>
    </Modal>
  );
};

export default UploadModal;
