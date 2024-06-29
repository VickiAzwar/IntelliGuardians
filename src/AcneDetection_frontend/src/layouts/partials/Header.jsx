import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Button } from "antd";
import { MenuFoldOutlined } from "@ant-design/icons";
import "./Layout.css";
import getDataUser from "../../helpers/getDataUser";

const Header = ({ collapsed, toggleDrawer }) => {
  const location = useLocation();
  const [title, setTitle] = useState("");
  const { id } = useParams();
  const [dataUser, setDataUser] = useState(null);

  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith("/category/") && id) {
      setTitle(`Category / ${id}`);
    } else {
      switch (path) {
        case "/":
        case "/home":
          setTitle("Home");
          break;
        case "/detection":
          setTitle("Detection");
          break;
        case "/category":
          setTitle("Category");
          break;
        case "/subscribe":
          setTitle("Subscribe");
          break;
        case "/tip":
          setTitle("Tips and Trick");
          break;
        default:
          setTitle("");
      }
    }
  }, [location.pathname, id]);

  useEffect(() => {
    const fetchDataUser = async () => {
      const user = await getDataUser();
      setDataUser(user);
    };

    fetchDataUser();
  }, []);

  // Fungsi untuk mengonversi Uint8Array ke base64
  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

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
          <h3>{dataUser?.username || 'User'}</h3>
          <p>{dataUser?.status !== undefined && dataUser.status !== '0' ? "Premium" : "Free"}</p>
        </div>
        <div className="rightContent">
          <Link to="/profile">
            {dataUser?.profile_image ? (
              <img
                src={`data:image/png;base64,${arrayBufferToBase64(dataUser.profile_image)}`}
                className="max-w-full h-10 w-auto pl-5"
                alt="Profile"
              />
            ) : (
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                className="max-w-full h-10 w-auto pl-5"
                alt="Default Profile"
              />
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
