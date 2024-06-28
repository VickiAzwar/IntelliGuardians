import React, { useEffect, useRef, useState } from "react";
import Button from "../../component/Button/Button";
import detectImg from "../../../assets/image/detect_hero2.webp";
import "./Detection.css";
import Camera from "./partials/Camera";
import Upload from "./partials/Upload";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl"; // set backend to webgl
import Loader from "../../component/Loading/Loader";
import Title from "../../component/Title/Title";
import { useLocation, useNavigate } from "react-router-dom";
import getDataUser from "../../helpers/getDataUser";
import initAuthClient from "../../actorBackend/initAuthClient";
import HandleUploadToken from "./partials/HandleUploadToken";
import ListItem from "./partials/ListItem";
import ImgDetection from "./partials/ImgDetection";

const Detection = () => {

  const [originalImage, setOriginalImage] = useState(null);
  const [loading, setLoading] = useState({ loading: true, progress: 0 });
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [actor, setActor] = useState(null);
  const [model, setModel] = useState({
    net: null,
    inputShape: [1, 0, 0, 3],
  });

  const [dataUser, setDataUser] = useState(null);

  const navigate = useNavigate();

  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const modelName = "yolov8n";

  useEffect(() => {
    tf.ready().then(async () => {
      const yolov8 = await tf.loadGraphModel(
        `${window.location.origin}/${modelName}_web_model/model.json`,
        {
          onProgress: (fractions) => {
            setLoading({ loading: true, progress: fractions });
          },
        }
      );

      const dummyInput = tf.ones(yolov8.inputs[0].shape);
      const warmupResults = yolov8.execute(dummyInput);

      setLoading({ loading: false, progress: 1 });
      setModel({
        net: yolov8,
        inputShape: yolov8.inputs[0].shape,
      });

      tf.dispose([warmupResults, dummyInput]);
      setIsModelLoaded(true);
    });
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      const { authClient, actor } = await initAuthClient();
      setActor(actor);

      const user = await getDataUser();
      setDataUser(user);
    };
    initAuth();
  }, []);

  const handlePremiumRedirect = () => {
    navigate("/subscribe"); // Ganti dengan rute ke menu premium Anda
  };

  const handleDetection = async () => {
    await HandleUploadToken(actor, dataUser, setDataUser, imageRef, model, canvasRef);
  };


  return (
    <>
      <div className="container">
        {loading.loading && (
          <Loader>
            Loading model... {(loading.progress * 100).toFixed(2)}%
          </Loader>
        )}
        <Title text="Smart Acne Detection" />
      </div>
      <ImgDetection
        imageRef={imageRef}
        originalImage={originalImage}
        handleDetection={handleDetection}
        model={model}
        canvasRef={canvasRef}
      />
      <div className="detection">
        <div className="input">
          <h3>Input your image</h3>
          <p>The input image will not be saved</p>
          <p className="text-slate-500">Cost <span className="text-sky-600">{dataUser?.token ? dataUser.token : 0}</span> credit's to detection.</p>

          {dataUser?.token > 0 || dataUser?.status === 1 ? (
            <div className="button">
              <Camera imageRef={imageRef} setOriginalImage={setOriginalImage} />
              <Upload imageRef={imageRef} setOriginalImage={setOriginalImage} />
            </div>
          ) : (
            <div className="text-red-600">
              <p>Insufficient credits for detection. Please purchase more credits.</p>
              <Button red onClick={handlePremiumRedirect} className="flex gap-2 items-center justify-center text-base w-40 rounded-full">
                Go to Premium
              </Button>
            </div>
          )} 

          <ListItem />

        </div>
        <div className="image">
          <img src={detectImg} alt="Detection" />
        </div>
      </div>
    </>
  );
};

export default Detection;
