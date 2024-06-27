import React from 'react';
import { Modal, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Webcam from 'react-webcam';

const CameraModal = ({ modalOpen, handleClose, showWebcam, handleCapture, capturedImage, handleRetake, handleUpload }) => {
  const webcamRef = React.useRef(null);

  return (
    <Modal
      title="Captured Your Image"
      centered
      open={modalOpen}
      onCancel={handleClose}
      footer={[
        <div className="flex justify-between w-full">
          {capturedImage ? (
            <div className="flex space-x-2">
              <Button key="upload" type="primary" onClick={handleUpload}>
                <UploadOutlined className="pr-2" /> Upload
              </Button>
              <Button key="retake" type="primary" onClick={handleRetake}>
                Retake
              </Button>
            </div>
          ) : (
            <Button key="capture" type="primary" onClick={() => handleCapture(webcamRef)}>
              Capture
            </Button>
          )}
          <Button key="back" onClick={handleClose}>
            Close
          </Button>
        </div>
      ]}
    >
      {showWebcam ? (
        <div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
          />
        </div>
      ) : (
        capturedImage && (
          <div>
            <h3>Captured Image</h3>
            <img src={capturedImage} alt="Captured" />
          </div>
        )
      )}
    </Modal>
  );
};

export default CameraModal;