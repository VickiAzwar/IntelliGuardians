import React from "react";
import styles from './Button.module.css';

const Button = ({ onClick, children, className, style, primary, secondary, red }) => {
  const buttonType = () => {
    if (primary) {
      return styles.btnPrimary;
    } else if (secondary) {
      return styles.btnSecondary;
    } else if (red) {
      return styles.btnRed;
    } else {
      return styles.btn; // Default class if none of the props are set
    }
  };

  return (
    <button
      onClick={onClick}
      style={style}
      className={`${styles.btn} ${buttonType()} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
