import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./partials/Sidebar";
import Header from "../layouts/partials/Header";
import Footer from "../layouts/partials/Footer";
import { Layout, theme} from "antd";
const { Sider, Content } = Layout;

function BaseLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const toggleDrawer = () => {
    setCollapsed(!collapsed);
  };

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setCollapsed(true); // Ensure sidebar is not collapsed on small screens
    } else {
      setCollapsed(false); // Collapse sidebar on larger screens if needed
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar collapsed={collapsed} />
      <Layout>
        <Header collapsed={collapsed} toggleDrawer={toggleDrawer} />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default BaseLayout;
