import React from 'react';
import { Outlet } from 'react-router-dom';
import SideMenu from './SideMenu';

// Exemplo de itens do menu
const menuItems = [
    {
        label: 'Home',
        icon: <span role="img" aria-label="home">🏠</span>,
        onClick: () => {
            // você pode implementar uma navegação programática ou deixar o Link do react-router
            console.log('Navegando para Home');
        },
    },
    {
        label: 'Sobre',
        icon: <span role="img" aria-label="about">ℹ️</span>,
        onClick: () => {
            console.log('Navegando para Sobre');
        },
    },
];

const user = {
    name: 'João da Silva',
    avatar: 'https://via.placeholder.com/40',
};

const handleLogout = () => {
    console.log('Realizando logout');
    // implemente a lógica de logout aqui
};

const Layout: React.FC = () => {
    return (
        <>
            <SideMenu menuItems={menuItems} user={user} onLogout={handleLogout} />
            {/* Conteúdo das outras páginas */}
            <div style={{ marginLeft: 250, padding: '20px' }}>
                <Outlet />
            </div>
        </>
    );
};

export default Layout;
