import React, { useEffect, useRef, useState } from "react";
import { message, Popconfirm } from "antd";
import Button from "../../../component/Button/Button";
import {
  CameraFilled,
} from "@ant-design/icons";
import CameraModal from "./CameraModal";


const Camera = ({ imageRef, setOriginalImage, buttonRef }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    if (buttonRef) {
      buttonRef.current = {
        click: handleCameraOpen
      };
    }
  }, [buttonRef]);

//   const webcamRef = useRef(null);
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
    console.log("imageSrc: ", imageSrc);
    setShowWebcam(false);
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setShowWebcam(true);
  };

  const handleUpload = async () => {
    if (!capturedImage) {
      message.error('No image captured to upload.');
      return;
    }

    try {
      const response = await fetch(capturedImage);
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);

      // imageRef.current.src = imageUrl;
      // imageRef.current.style.display = "block"

      // Simulate an upload action
      console.log('Image URL:', imageUrl);
      message.success('Image URL created successfully!');
      handleClose();

      // Cleanup the URL object after use
      // URL.revokeObjectURL(imageUrl);
    } catch (error) {
      message.error(error);
    }
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
        <Button className="flex gap-2 items-center justify-center text-base w-40 rounded-full" primary>
          <CameraFilled /> Camera
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