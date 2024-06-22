import React, { useRef, useState } from "react";
import Button from "../../component/Button/Button";
import detectImg from "../../../assets/image/detect_hero2.webp";

import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  MehOutlined,
  BulbOutlined
} from "@ant-design/icons";
import ItemList from "../../component/ItemList/ItemList";
import "./Detection.css";

import Camera from "./partials/Camera";
import Upload  from "./partials/Upload";

const Detection = () => {
  // const { handleCameraOpen } = useCamera()

  const items = [
    { icon: DeleteOutlined, text: "Remove Makeup" },
    { icon: EyeInvisibleOutlined, text: "Take off the glasses" },
    { icon: MehOutlined, text: "Make sure it doesn't block your face" },
    { icon: BulbOutlined, text: "Make sure the lighting is sufficient" },
  ];

  // const props = {
  //   onRemove: (file) => {
  //     setFileList([]);
  //   },
  //   beforeUpload: (file) => {
  //     setFileList([file]);
  //     return false;
  //   },
  //   fileList,
  //   maxCount: 1,
  //   listType: 'picture',
  // };


  return (
    <>
      <div className="container">
        <h1>Smart Acne Detection</h1>
      </div>
      <div className="detection">

        <div className="input">
          <h3>Input your image</h3>
          <p>The input image will not be saved</p>
          <div className="button">
            <Camera />
            <Upload />
            {/* <Upload {...props}>
              <Button className="text-base w-40" primary>
                <UploadOutlined className="pr-2" />
                Gallery
              </Button>
            </Upload> */}
          </div>
          <p>For the best result:</p>
          <ul>
            {items.map((item, index) => (
              <li key={index} className="pb-2">
                <ItemList
                  icon={item.icon}
                  text={item.text}
                  secondary
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="image">
          <img
            src={detectImg}
            alt="Detection"
          />
        </div>
      </div>
    </>
  );
};

export default Detection;
