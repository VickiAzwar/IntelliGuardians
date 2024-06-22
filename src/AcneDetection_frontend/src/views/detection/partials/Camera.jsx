import React, { useRef, useState } from "react";
import { message, Popconfirm } from "antd";
import Button from "../../../component/Button/Button";
import {
  CameraFilled,
} from "@ant-design/icons";
import CameraModal from "./CameraModal";


const Camera = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const webcamRef = useRef(null);

  const handleCameraOpen = () => {
    setShowWebcam(true);
    setCapturedImage(null);
    setModalOpen(true);
  };

  const handleCloseCamera = () => {
    setShowWebcam(false);
    setTimeout(() => {
      setModalOpen(false);
    }, 300);
  };

  const handleCapture = (webcamRef) => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setShowWebcam(false);
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setShowWebcam(true);
  };

  const handleUpload = () => {
    if (!capturedImage) {
      message.error('No image captured to upload.');
      return;
    }

    // Simulate an upload action
    message.success('Image uploaded successfully!');
  };
  return (
    <>
      <Popconfirm
        title="Open Camera"
        description="Do you want to open the camera?"
        onConfirm={handleCameraOpen}
        // onCancel={() => message.info('Camera open cancelled')}
        okText="Yes"
        cancelText="No"
        placement="top"
      >
        <Button className="text-base w-40" primary>
          <CameraFilled className="pr-2" /> Camera
        </Button>
      </Popconfirm>
      <CameraModal
        modalOpen={modalOpen}
        handleClose={handleCloseCamera}
        showWebcam={showWebcam}
        handleCapture={handleCapture}
        capturedImage={capturedImage}
        handleRetake={handleRetake}
        handleUpload={handleUpload}
      />
    </>
  );
};


export default Camera;