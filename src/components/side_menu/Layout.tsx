import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideMenu from "./SideMenu";
import { FaUser } from "react-icons/fa";

const Layout: React.FC = () => {
    const navigate = useNavigate();

    const menuItems = [
        {
            label: "Home",
            icon: <span role="img" aria-label="home">🏠</span>,
            onClick: () => navigate("/home"),
        },
        {
            label: "User",
            icon: <span role="img" aria-label="user"><FaUser /></span>,
            onClick: () => navigate("/users"),
        },
        {
            label: "Sobre",
            icon: <span role="img" aria-label="about">ℹ️</span>,
            onClick: () => navigate("/sobre"),
        },
    ];



    return (
        <>
            <SideMenu menuItems={menuItems} />
            <div style={{ marginLeft: 250, padding: "20px" }}>
                <Outlet />
            </div>
        </>
    );
};

export default Layout;
