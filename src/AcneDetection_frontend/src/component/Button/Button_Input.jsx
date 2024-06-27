import { Col } from 'antd';
import React from 'react';
import { FaCamera } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";

const ButtonInput = () => {

    return (
        <div className='flex gap-4 items-center'>
            <Button>
                
            </Button>
            <Col> 
                <button className='font-medium w-full px-10 py-2 rounded-full bg-sky-500 text-white text-xl'>
                    <FaCamera/>
                    Camera
                </button>
            </Col>
            <Col> 
                <button className='font-medium w-full px-10 py-2 rounded-full bg-sky-500 text-white text-xl'>
                    <GrGallery />
                    Gallery
                </button>
            </Col>
        </div>
    )
}


export default ButtonInput;