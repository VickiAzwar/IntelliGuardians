import React from "react";
import './Home.css';
import SearchBar from "../../component/SearchBar/SearchBar";
import Button from "../../component/Button/Button";
import AcneCategory from "../../views/category/Acne_Category";
import { FaCamera } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import Title from "../../component/Title/Title";
import { useNavigate } from "react-router-dom";


function Home() {
    const navigate = useNavigate();

    const handleGalleryClick = () => {
        navigate('/detection', { state: { triggerUpload: true } });
    }

    const handleCameraClick= () => {
        navigate('/detection', { state: { triggerCamera: true } });
    }


    return (
        <>
            <Title text="Detection" />
            <div className="detection">
                <div className="divBtn">
                    <Button className="btnStyle rounded-full px-10 py-2 " primary onClick={handleCameraClick}y>
                        <FaCamera />
                        Camera
                    </Button>
                    <Button primary className="btnStyle rounded-full px-10 py-2" onClick={handleGalleryClick}>
                        <GrGallery />
                        Gallery
                    </Button>
                </div>
                <div className="">
                    <SearchBar />
                </div>
            </div>
            <div className="mt-8">
                <Title text="Acne Category" />
                <AcneCategory />
            </div>
        </>
    );

};

export default Home;