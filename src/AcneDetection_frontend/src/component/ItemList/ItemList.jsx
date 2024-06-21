import React from "react";
import styles from "./ItemList.module.css";

const ItemList = ({ icon: Icon, text, className, primary, secondary, outline }) => {

    const itemType = () => {
        if (primary) {
            return styles.itemPrimary;
        } else if (secondary) {
            return styles.itemSecondary;
        } else if (outline) {
            return styles.itemOutline;
        }
    };

  return (
    <div className={`${styles.item} ${itemType()} ${className}`}>
      <Icon className="pr-2" />
      {text}
    </div>
  );
};

export default ItemList;
