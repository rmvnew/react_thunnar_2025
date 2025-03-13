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
            label: "Empresa",
            icon: <span role="img" aria-label="Company">🏠</span>,
            onClick: () => navigate("/companies"),
        },
        {
            label: "Clientes",
            icon: <span role="img" aria-label="Cliente"><FaUser /></span>,
            onClick: () => navigate("/clients"),
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
