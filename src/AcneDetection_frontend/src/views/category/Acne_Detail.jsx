import React from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import { DataAcne } from '../../component/Data/Data_Acne';
import "./Acne_Detail.css";

const AcneDetail = () => {
    const { id } = useParams(); // Gunakan useParams untuk mendapatkan id dari URL
    const acne = DataAcne.find(item => item.id === parseInt(id));

    if (!acne) {
        return <div>Detail not found</div>;
    }

    return (
        <div className="container mt-2">
            <div className="row">
                <div className="col-md-4 text-center">
                    <img 
                        src={acne.image} 
                        alt={acne.name} 
                        className="img-fluid rounded center-image" 
                        style={{
                            width: '361px',
                            height: '361px',
                            borderRadius: '25px',
                        }} 
                    />
                </div>
                <div className="col-md-8 bg-neutral-50 p-2 text-left rounded-lg shadow-md cursor-pointer">
                    <h1 className="font-bold text-2xl text-sky-800 m-3 font-sans">{acne.name}</h1>
                    <p className='text-lg text-sky-800 font-sans'>{acne.about}</p>
                    <h2 className="font-bold text-xl text-sky-800 mt-4 m-3 font-sans">Penyebab?</h2>
                    <p className='text-lg text-sky-800 font-sans'>{acne.reason}</p>
                    <h2 className="font-bold text-xl text-sky-800 mt-4 m-3 font-sans">Cara Mengatasi?</h2>
                    <p className='text-lg text-sky-800 font-sans'>{acne.overcome}</p>
                    <p className="text-xl text-sky-800 font-sans mt-4"><strong>Sumber Informasi : </strong> {acne.info}</p>
                </div>
            </div>
        </div>
    );
};

export default AcneDetail;