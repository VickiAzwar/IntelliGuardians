import React from 'react';
import LogoImg from '../../../assets/image/logo.png';

const Logo = ({ collapsed }) => {
  return (
    <div className="flex items-center gap-4 p-5">
      <img src={LogoImg} alt="Logo" className="max-w-full h-10 w-auto" />
      {!collapsed && (
        <h1 className="text-xl">
          <span className="text-sky-600">Acne</span> Detection
        </h1>
      )}
    </div>
  );
};

export default Logo;
