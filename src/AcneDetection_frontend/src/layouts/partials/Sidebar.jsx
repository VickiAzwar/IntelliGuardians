import React, { useState } from "react";
import {
  SketchCircleFilled,
  CameraFilled,
  HomeFilled,
  GoldFilled,
  FrownFilled,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../component/Logo/Logo";
const { Sider } = Layout;

const Sidebar = ({ collapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      key: "/home",
      icon: <HomeFilled />,
      label: "Home",
    },
    {
      key: "/detection",
      icon: <CameraFilled />,
      label: "Detection",
    },
    {
      key: "/category",
      icon: <GoldFilled />,
      label: "Category",
    },
    {
      key: "/subscribe",
      icon: <SketchCircleFilled />,
      label: "Subscribe",
    },
    
  ];

  const handleMenuClick = (e) => {
    navigate(e.key);
  };
  const handleLogoutClick = () => {
    navigate('/logout');
  };
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{ background: "#fff" }}
    >
      <Logo collapsed={collapsed} />
      <Menu
        className="p-2"
        style={{ fontSize: '16px' }}
        theme="light"
        mode="inline"
        selectedKeys={[location.pathname]}
        onClick={handleMenuClick}
        items={menuItems}
      />
      <hr className="m-3 border-blue-gray-50" />
      <Menu
        className="p-2"
        theme="light"
        mode="inline"
        selectedKeys={[location.pathname]}
        onClick={handleLogoutClick}
        items={[{key: '/logout', icon: <FrownFilled />, label: 'Login'}]}
      />
    </Sider>
  );
};
export default Sidebar;
