// ImgDetection.jsx
import React from 'react';

const ImgDetection = ({ imageRef, originalImage, handleDetection, model, canvasRef }) => {
    return (
        <>
            {imageRef && originalImage && (
                <div className="flex justify-center gap-10 border-solid border-2 p-5 rounded-lg">
                    <div className="image-container">
                        <h3 className="mb-2 font-bold">Original Image</h3>
                        <img
                            src={originalImage}
                            className="w-full max-w-[720px] max-h-[500px] rounded-lg"
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
                                alt="Original"
                                className="hidden sm:block w-full max-w-[720px] max-h-[500px] rounded-lg"
                            />
                            <canvas
                                width={model.inputShape[1]}
                                height={model.inputShape[2]}
                                ref={canvasRef}
                                className="absolute top-0 left-0 w-full h-full object-fill rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ImgDetection;
