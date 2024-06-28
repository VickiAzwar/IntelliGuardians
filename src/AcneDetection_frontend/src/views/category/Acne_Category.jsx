import React from 'react';
import { DataAcne } from "../../component/Data/Data_Acne";
import { Link } from 'react-router-dom';
import "./Acne_Category.css";

const AcneCategory = () => {

    return (

        <div className="itemContain">
            <div className="cardContain">
                {DataAcne.map((data) => {
                    return (
                        <div key={data.id} className="mainContain">
                            <div
                                className="content"
                                style={{ textAlign: 'left' }}
                                
                            >
                                <Link to={`/category/${data.id}`} style={{ textDecoration: 'none' }}>
                                    <img src={data.image} alt="image" />
                                    <h1>{data.name}</h1>
                                    <h2>Selengkapnya...</h2>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

    )
}

export default AcneCategory;