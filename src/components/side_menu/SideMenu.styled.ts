import styled from 'styled-components';

interface ContainerProps {
  isOpen: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 250px;
  height: 100vh;
  background-color: #2c3e50;
  color: #ecf0f1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 768px) {
    transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
    z-index: 1000;
  }
`;

export const Menu = styled.ul`
  list-style: none;
  padding: 20px;
  margin: 0;
  flex: 1;
`;

export const MenuItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px 0;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #34495e;
  }

  span {
    margin-left: 10px;
  }
`;

export const Footer = styled.div`
  padding: 20px;
  border-top: 1px solid #34495e;
 
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 0.7rem;
  

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
`;

export const LogoutButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #e74c3c;
  border: none;
  border-radius: 4px;
  color: #ecf0f1;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color:rgb(151, 49, 38);
  }
`;

export const ToggleButton = styled.button`
  position: fixed;
  top: 20px;
  left: 20px;
  background: none;
  border: none;
  color: #2c3e50;
  font-size: 24px;
  cursor: pointer;
  z-index: 1100;

  @media (min-width: 769px) {
    display: none;
  }
`;
