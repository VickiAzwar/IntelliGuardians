import React from 'react';
import LogoImg from '../../../assets/image/logo.png';
import './Logo.css';

const Logo = ({ collapsed }) => {
  return (
    <div className="loading">
      <img src={LogoImg} alt="Logo" />
      {!collapsed && (
        <h1>
          <span>Acne</span> Detection
        </h1>
      )}
    </div>
  );
};

export default Logo;
