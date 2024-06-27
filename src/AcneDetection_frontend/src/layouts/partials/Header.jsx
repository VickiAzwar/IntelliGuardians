import React, { useState, useEffect } from "react";
import { useLocation} from "react-router-dom";
import { Button } from "antd";
import {
  MenuFoldOutlined,
} from "@ant-design/icons";
import "./Layout.css";
import getDataUser from "../../helpers/getDataUser";


const Header = ({collapsed, toggleDrawer}) => {

  const location = useLocation();
  const [title, setTitle] = useState("");

  const dataUser = getDataUser();

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/home") {
      setTitle("Home");
    } else if (location.pathname === "/detection") {
      setTitle("Detection");
    } else if (location.pathname === "/category") {
      setTitle("Category");
    } else if (location.pathname === "/subscribe") {
      setTitle("Subscribe");
    } else {
      setTitle("");
    }
  }, [location.pathname]);

  return (
    <div className="header">
      
      <div className="btn">
        
        <Button
            type="text"
            className="text-white font-bold"
            icon={collapsed ? <MenuFoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleDrawer}
          />
          {title}
      </div>
      <div className="profile">
        <div className="leftContent">
        <h3>{dataUser?.username ? dataUser.username : 'User'}</h3>
          <p>
          {dataUser?.status !== undefined && dataUser.status !== '0' ? "Premium" : "Free"}
          </p>
        </div>
        <div className="rightContent">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            className="max-w-full h-10 w-auto pl-5"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
