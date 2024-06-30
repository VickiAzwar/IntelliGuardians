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
            <div className="detailItem">
                <div className="">
                    <img
                        src={acne.image}
                        alt={acne.name}
                    />
                </div>
                <div className="descriptionDetail">
                    <h1>{acne.name}</h1>
                    <p>{acne.about}</p>
                    <h2>Penyebab?</h2>
                    <p>{acne.reason}</p>
                    <h2>Cara Mengatasi?</h2>
                    <p>{acne.overcome}</p>
                    <p><strong>Sumber Informasi : </strong> {acne.info}</p>
                </div>
            </div>

        </>

    );
};

export default AcneDetail;