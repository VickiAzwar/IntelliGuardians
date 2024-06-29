import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Button } from "antd";
import {
  MenuFoldOutlined,
} from "@ant-design/icons";
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
                src={`data:image/png;base64,${dataUser.profile_image}`}
                className="max-w-full h-10 w-auto pl-5"
                alt=""
              />
            ) : (
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                className="max-w-full h-10 w-auto pl-5"
                alt=""
              />
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
