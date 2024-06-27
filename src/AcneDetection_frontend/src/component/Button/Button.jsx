import React from "react";
import styles from './Button.module.css';

const Button = ({ onClick, key, children, className, buttonRef, style, primary, secondary, red, disabled}) => {
  const buttonType = () => {
    if (primary) {
      return styles.btnPrimary;
    } else if (secondary) {
      return styles.btnSecondary;
    } else if (red) {
      return styles.btnRed;
    } else if (disabled) {
      return styles.disabled;
    } 
    else {
      return styles.btn; // Default class if none of the props are set
    }
  };

  return (
    <button
      ref={buttonRef}
      key={key}
      onClick={onClick}
      style={style}
      disabled={disabled}
      className={`${styles.btn} ${buttonType()} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
