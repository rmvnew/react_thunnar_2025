import React, { useState } from 'react';
import {
    Container,
    Menu,
    MenuItem,
    Footer,
    UserInfo,
    LogoutButton,
    ToggleButton,
} from './SideMenu.styled';

interface MenuItemProps {
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
}

interface User {
    name: string;
    avatar?: string;
}

interface SideMenuProps {
    menuItems: MenuItemProps[];
    user: User;
    onLogout: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ menuItems, user, onLogout }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <ToggleButton onClick={toggleMenu}>
                {/* Ícone de menu (pode ser substituído por um componente de ícone) */}
                ☰
            </ToggleButton>
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
                        {user.avatar && <img src={user.avatar} alt={user.name} />}
                        <span>{user.name}</span>
                    </UserInfo>
                    <LogoutButton onClick={onLogout}>Logout</LogoutButton>
                </Footer>
            </Container>
        </>
    );
};

export default SideMenu;
