import React, { useState } from "react";
import { useAuth } from "@contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
    Container, Menu, MenuItem, Footer, UserInfo, LogoutButton, ToggleButton
} from "./SideMenu.styled";

interface MenuItemProps {
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
}

interface SideMenuProps {
    menuItems: MenuItemProps[];
}

const SideMenu: React.FC<SideMenuProps> = ({ menuItems }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <>
            <ToggleButton onClick={toggleMenu}>☰</ToggleButton>
            <Container isOpen={isOpen}>
                <Menu>
                    {menuItems.map((item, index) => (
                        <MenuItem key={index} onClick={item.onClick}>
                            {item.icon}
                            <span>{item.label}</span>
                        </MenuItem>
                    ))}
                </Menu>
                <Footer>
                    <UserInfo>
                        {/* Se tiver avatar, mostra a imagem */}
                        {user?.avatar && (
                            <img
                                src={user.avatar}
                                alt={user.name}
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    marginRight: "10px",
                                }}
                            />
                        )}
                        <div>
                            <span>{user?.name}</span>
                            <div style={{ fontSize: "12px", opacity: 0.7 }}>
                                {user?.profile}
                            </div>
                        </div>
                    </UserInfo>
                    <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
                </Footer>
            </Container>
        </>
    );
};

export default SideMenu;
