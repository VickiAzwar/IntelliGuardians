import {
  Card,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import React, { useState } from "react";
import Logo from "../../assets/img/logo.png";
import {
  PowerIcon,
  CurrencyDollarIcon,
  RectangleGroupIcon,
  FaceSmileIcon,
  HomeModernIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import SidebarItem from "../../component/SidebarItem/SidebarItem";
import { useLocation } from "react-router-dom";

const Sidebar = ({isDrawerOpen, toggleDrawer }) => {
  const location = useLocation();

  return (
    <>
    <Drawer open={isDrawerOpen} onClose={toggleDrawer}>
    <Card className="h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="flex items-center gap-4 my-1">
          <img src={Logo} alt="" className="max-w-full h-10 w-auto" />
          <h1 className="text-xl">
            <span className="text-sky-600">Acne</span> Detection
          </h1>
        </div>
        <List className="py-10">
          <SidebarItem
            icon={HomeModernIcon}
            text={"Home"}
            isActive={location.pathname === "/home"}
            to="/home"
          />
          <SidebarItem
            icon={FaceSmileIcon}
            text={"Detection"}
            isActive={location.pathname === "/detection"}
            to="/detection"
          />
          <SidebarItem
            icon={RectangleGroupIcon}
            text={"Category"}
            isActive={location.pathname === "/category"}
            to="/category"
          />
          <SidebarItem
            icon={CurrencyDollarIcon}
            text={"Subscribe"}
            isActive={location.pathname === "/subscribe"}
            to="/subscribe"
          />

          <hr className="my-3 border-blue-gray-50" />

          <SidebarItem icon={PowerIcon} text={"Log Out"} logout />
        </List>
      </Card>
    </Drawer>
    </>
  );
};

export default Sidebar;
