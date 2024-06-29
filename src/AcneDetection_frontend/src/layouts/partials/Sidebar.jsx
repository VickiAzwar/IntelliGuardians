import React, { useEffect, useState } from "react";
import {
  SketchCircleFilled,
  CameraFilled,
  HomeFilled,
  GoldFilled,
  LogoutOutlined,
  BulbFilled,
  ClockCircleFilled
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../component/Logo/Logo";
import { AuthClient } from "@dfinity/auth-client";
import getDataUser from "../../helpers/getDataUser";

const { Sider } = Layout;

const Sidebar = ({ collapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [dataUser, setDataUser] = useState(null);

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
    // {
    //   key: "/history",
    //   icon: <ClockCircleFilled />,
    //   label: "History",
    // },
  ];

  useEffect(() => {
    const fetchDataUser = async () => {
      const user = await getDataUser();
      setDataUser(user);
    };

    fetchDataUser();
  }, []);

  const handleMenuClick = (e) => {
    navigate(e.key);
  };

  const handleLogoutClick = async () => {
    const authClient = await AuthClient.create();
    await authClient.logout();
    localStorage.removeItem('session');
    localStorage.clear();
    navigate('/login');
  };

  if (dataUser && dataUser.status === '1') {
    menuItems.push({
      key: "/tip",
      icon: <BulbFilled />,
      label: "Tips and Trick",
    });
  }

  // Determine the selected key for the menu
  const selectedKey = location.pathname.startsWith("/category/") ? "/category" : location.pathname;

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
        selectedKeys={[selectedKey]}
        onClick={handleMenuClick}
        items={menuItems}
      />
      <hr className="m-3 border-blue-gray-50" />
      <Menu
        className="p-2"
        theme="light"
        mode="inline"
        onClick={handleLogoutClick}
        items={[{ key: '/logout', icon: <LogoutOutlined />, label: 'Log Out' }]}
      />
    </Sider>
  );
};

export default Sidebar;
