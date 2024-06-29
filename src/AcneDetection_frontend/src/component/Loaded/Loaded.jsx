import React from "react";
import LoadImg from "../../../assets/image/loadimg.png";
import "./Loaded.css";

const Loaded = ({text}) => {
  return (
    <div className="loading-overlay">
      <div className="loading-container">
        <img src={LoadImg} alt="Loading..." className="loading-image" />
        <br />
        <p className="loading-text">
          {"LOADING".split("").map((char, index) => (
            <span key={index} className="wave" style={{ animationDelay: `${index * 0.1}s` }}>
              {char}
            </span>
          ))}
          
        </p>
        {text && <p className="additional-text">{text}</p>}
      </div>
    </div>
  );
};

export default Loaded;
