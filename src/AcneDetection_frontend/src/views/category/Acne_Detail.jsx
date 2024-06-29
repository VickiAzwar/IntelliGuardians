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
        <>
            <div className="flex flex-col justify-center">
                <div className="flex-1 text-center p-0 top-0">
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
                <div className="flex-1 bg-neutral-50 mx-10 p-3 text-left border-2 rounded-lg max-w-full shadow-md cursor-pointer">
                    <h1 className="font-bold text-2xl text-sky-800 m-3 font-sans">{acne.name}</h1>
                    <p className='text-lg text-sky-800 font-sans'>{acne.about}</p>
                    <h2 className="font-bold text-xl text-sky-800 mt-4 m-3 font-sans">Penyebab?</h2>
                    <p className='text-lg text-sky-800 font-sans'>{acne.reason}</p>
                    <h2 className="font-bold text-xl text-sky-800 mt-4 m-3 font-sans">Cara Mengatasi?</h2>
                    <p className='text-lg text-sky-800 font-sans'>{acne.overcome}</p>
                    <p className="text-xl text-sky-800 font-sans mt-4"><strong>Sumber Informasi : </strong> {acne.info}</p>
                </div>
            </div>

        </>

    );
};

export default AcneDetail;