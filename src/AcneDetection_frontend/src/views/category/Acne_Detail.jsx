import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import { useParams } from 'react-router-dom'; // Untuk mengambil parameter ID dari URL
import { DataAcne } from "../../component/Data/Data_Acne";

const DetailAcne = () => {
    // Ambil parameter ID dari URL
    let { id } = useParams();
    
    // Cari data acne sesuai ID yang dipilih
    const acneData = DataAcne.find(item => item.id === parseInt(id));

    if (!acneData) {
        return <div>Acne dengan ID yang dipilih tidak ditemukan.</div>;
    }

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-md-6">
                    <img src={acneData.image} alt="acne" className="img-fluid rounded" />
                </div>
                <div className="col-md-6">
                    <h1 className="mb-4">{acneData.name}</h1>
                    <p><strong>About:</strong> {acneData.about}</p>
                    <p><strong>Reason:</strong> {acneData.reason}</p>
                    <p><strong>Overcome:</strong> {acneData.overcome}</p>
                    <p><strong>Info:</strong> {acneData.info}</p>
                </div>
            </div>
        </div>
    );
}

export default DetailAcne;