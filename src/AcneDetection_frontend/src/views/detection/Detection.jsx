import React, { useEffect, useRef, useState } from "react";
import Button from "../../component/Button/Button";
import detectImg from "../../../assets/image/detect_hero2.webp";

import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  MehOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import ItemList from "../../component/ItemList/ItemList";
import "./Detection.css";
import { GrGallery } from "react-icons/gr";

import Camera from "./partials/Camera";
import Upload from "./partials/Upload";

import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl"; // set backend to webgl
import Loader from "../../component/Loading/Loader";
import detect from "../../utils/detect";
import Title from "../../component/Title/Title";
import { useLocation } from "react-router-dom";

const Detection = () => {
  // const { handleCameraOpen } = useCamera()

  const items = [
    { icon: DeleteOutlined, text: "Remove Makeup" },
    { icon: EyeInvisibleOutlined, text: "Take off the glasses" },
    { icon: MehOutlined, text: "Make sure it doesn't block your face" },
    { icon: BulbOutlined, text: "Make sure the lighting is sufficient" },
  ];

  const [originalImage, setOriginalImage] = useState(null);
  const [loading, setLoading] = useState({ loading: true, progress: 0 }); // loading state
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [model, setModel] = useState({
    net: null,
    inputShape: [1, 0, 0, 3],
  }); // init model & input shape

  // Get Location
  const location = useLocation();
  const uploadButtonRef = useRef(null);

  // References
  const imageRef = useRef(null);
  const canvasRef = useRef(null);

  // model configs
  const modelName = "yolov8n";

  // useEffect(() => {
  //   tf.ready().then(async () => {
  //     const yolov8 = await tf.loadGraphModel(
  //       `${window.location.origin}/${modelName}_web_model/model.json`,
  //       {
  //         onProgress: (fractions) => {
  //           setLoading({ loading: true, progress: fractions }); // set loading fractions
  //         },
  //       }
  //     ); // load model

  //     // warming up model
  //     const dummyInput = tf.ones(yolov8.inputs[0].shape);
  //     const warmupResults = yolov8.execute(dummyInput);

  //     setLoading({ loading: false, progress: 1 });
  //     setModel({
  //       net: yolov8,
  //       inputShape: yolov8.inputs[0].shape,
  //     }); // set model & input shape

  //     tf.dispose([warmupResults, dummyInput]); // cleanup memory
  //     setIsModelLoaded(true);
  //   });
  // }, []);

  useEffect(() => {
    if (location.state?.triggerUpload && isModelLoaded) {
      setTimeout(() => {
        uploadButtonRef.current?.click();
      }, 1000);
    }
  }, [location.state, isModelLoaded]);
  return (
    <>
      <div className="container">
        {/* {loading.loading && (
          <Loader>
            Loading model... {(loading.progress * 100).toFixed(2)}%
          </Loader>
        )} */}
        <Title text="Smart Acne Detection"/>
      </div>
      {imageRef.current && originalImage &&(
        <div className="flex justify-center gap-10 border-solid border-2 p-5 rounded-lg">
          <div className="image-container">
            <h3 className="mb-2 font-bold">Original Image</h3>
            <img
              src={originalImage}
              className="max-w-full w-20 h-auto"
              alt="Original Image"
            />
          </div>
          <div className="relative content">
            <h3 className="mb-2 font-bold">Detection Image</h3>
            <img
              src="#"
              ref={imageRef}
              onLoad={() => detect(imageRef.current, model, canvasRef.current)}
              alt="Original"
              className="hidden sm:block w-full max-w-[720px] max-h-[500px] rounded-lg"
            />
            <canvas
              width={model.inputShape[1]}
              height={model.inputShape[2]}
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      )}
      <div className="detection">
        <div className="input">
          <h3>Input your image</h3>
          <p>The input image will not be saved</p>
          <div className="button">
            <Camera imageRef={imageRef} setOriginalImage={setOriginalImage}/>
            <Upload imageRef={imageRef} setOriginalImage={setOriginalImage} buttonRef={uploadButtonRef} />
          </div>
          <p>For the best result:</p>
          <ul>
            {items.map((item, index) => (
              <li key={index} className="pb-2">
                <ItemList icon={item.icon} text={item.text} secondary />
              </li>
            ))}
          </ul>
        </div>
        <div className="image">
          <img src={detectImg} alt="Detection" />
        </div>
      </div>
    </>
  );
};

export default Detection;
