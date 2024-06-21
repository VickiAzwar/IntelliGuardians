import React from "react";
import Button from "../../component/Button/Button";
import detectImg from "../../../assets/image/detect_hero2.webp"
import {
  CameraFilled,
  UploadOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  MehOutlined,
  BulbOutlined
} from "@ant-design/icons";
import ItemList from "../../component/ItemList/ItemList";
import "./Detection.css";

const Detection = () => {

  const items = [
    { icon: DeleteOutlined, text: "Remove Makeup" },
    { icon: EyeInvisibleOutlined, text: "Take off the glasses" },
    { icon: MehOutlined, text: "Make sure it doesn't block your face" },
    { icon: BulbOutlined, text: "Make sure the lighting is sufficient" },
  ];

  return (
    <>
      <div className="container">
        <h1>Smart Acne Detection</h1>
        <p>
          Smart Acne Detection: Easily identify your acne type from home,
          efficiently and affordably. Harness the power of intelligent
          technology for clear, confident skin.
        </p>
      </div>
      <div className="detection">
        <div className="image">
          <img
            src={detectImg}
            alt="Detection"
          />
        </div>
        <div className="input">
          <h3>Input your image</h3>
          <p>The input image will not be saved</p>
          <div className="button">
            <Button className="text-base" primary>
              <CameraFilled className="pr-2" /> Camera
            </Button>
            <Button className="text-base" primary>
              <UploadOutlined className="pr-2" />
              Gallery
            </Button>
          </div>
          <p>For the best result:</p>
          <ul>
              {items.map((items, index) =>(
                <li key={index} className="pb-2">
                  <ItemList
                    icon={items.icon}
                    text={items.text}
                    secondary
                  />
                </li>
              ))}
            </ul> 
        </div>
      </div>
    </>
  );
};

export default Detection;
