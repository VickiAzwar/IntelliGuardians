import React from "react";

import { ListItem, ListItemPrefix } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const SidebarItem = ({ icon: Icon, text, className, isActive, logout, to }) => {
    const activeMenu = () => {
        if (isActive) {
            return "bg-sky-600 hover:bg-sky-800 rounded-lg text-white my-1";
        } else if(logout) {
            return "outline outline-red-500 outline-1 rounded-lg text-red-500 hover:bg-red-500 hover:text-white my-3";
        }
    }

    return (
        <Link to={to}>
        <ListItem className={`${activeMenu()} ${className} p-2`}>
            <ListItemPrefix>
                <Icon className="h-5 w-5" />
            </ListItemPrefix>
            <p className="pl-3">{text}</p>
        </ListItem>
        </Link>
        
    );
}

export default SidebarItem;