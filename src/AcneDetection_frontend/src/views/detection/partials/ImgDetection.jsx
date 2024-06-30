// ImgDetection.jsx
import React from 'react';
import Button from "../../../component/Button/Button";
import "./ImgDetecion.css";

const ImgDetection = ({ imageRef, originalImage, handleDetection, model, canvasRef, acneData }) => {
    return (
        <>
            {imageRef && originalImage && (
                <div className="imgDetectItem">
                    <div className="imgOriginal">
                        <h3 className="">Original Image</h3>
                        <img
                            src={originalImage}
                            alt="Original Image"
                        />
                    </div>
                    <div className="imgResult">
                        <h3 className="">Detection Image</h3>
                        <div className="relative">
                            <img
                                src="#"
                                ref={imageRef}
                                onLoad={handleDetection}
                                alt="Detection"
                            />
                            <canvas
                                width={model.inputShape[1]}
                                height={model.inputShape[2]}
                                ref={canvasRef}
                            />
                        </div>
                    </div>
                    <div className='detailResult'>
                        {acneData && (
                            <div className="contentResult">
                                <ul>
                                    {acneData.tipeacne.map((type, index) => (
                                        <li key={index} className="itemResult">
                                            <div
                                                className="w-4 h-4 mr-2"
                                                style={{ backgroundColor: acneData.palette[index] }}
                                            ></div>
                                            {type}: {acneData.numtipeacne[index]}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    {/* <div className='mt-10'>
                        <Button secondary className={"rounded-full text-lg"} onClick={handleSaveDetect}>
                            Save Data Detection
                        </Button>
                    </div> */}
                </div>


            )}
        </>
    );
};

export default ImgDetection;
