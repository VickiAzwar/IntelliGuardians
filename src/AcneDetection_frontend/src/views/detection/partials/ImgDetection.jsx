// ImgDetection.jsx
import React from 'react';
import Button from "../../../component/Button/Button"

const ImgDetection = ({ imageRef, originalImage, handleDetection, model, canvasRef, acneData, handleSaveDetect}) => {
    return (
        <>
            {imageRef && originalImage && (
                <div className='flex flex-col justify-center items-center border-solid border-2 p-5 rounded-lg'>
                    <div className="flex justify-center text-center gap-10 ">
                        <div className="image-container">
                            <h3 className="mb-2 font-bold">Original Image</h3>
                            <img
                                src={originalImage}
                                className="w-full max-w-[640px] max-h-[500px] rounded-lg"
                                alt="Original Image"
                            />
                        </div>
                        <div className="image-container">
                            <h3 className="mb-2 font-bold">Detection Image</h3>
                            <div className="relative">
                                <img
                                    src="#"
                                    ref={imageRef}
                                    onLoad={handleDetection}
                                    alt="Detection"
                                    className="hidden sm:block w-full max-w-[640px] max-h-[500px] rounded-lg"
                                />
                                <canvas
                                    width={model.inputShape[1]}
                                    height={model.inputShape[2]}
                                    ref={canvasRef}
                                    className="absolute top-0 left-0 w-full h-full object-fill rounded-lg"
                                />
                            </div>
                        </div>
                        <div>
                            {acneData && (
                                <div className="acne-data mt-4 text-base">
                                    <ul>
                                        {acneData.tipeacne.map((type, index) => (
                                            <li key={index} className="flex items-center">
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
