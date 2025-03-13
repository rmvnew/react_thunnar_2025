import styled, { createGlobalStyle } from "styled-components";
import { Button as MuiButton, TextField, IconButton, Switch } from "@mui/material";


export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html, body {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
  }
`;




export const AddUserButton = styled(MuiButton)`
  background-color: #28a745 !important;
  color: white !important;
  font-weight: bold;
  height: 50px;
 
  &:hover {
    background-color: #218838 !important;
  }
`;

export const BackButton = styled(MuiButton)`
  background-color: #007bff !important;
  margin-buttom: 15px; 
  height: 50px;
  color: white !important;
  font-weight: bold;
  
  &:hover {
    background-color: #0056b3 !important;
  }
`;



export const TableContainerStyled = styled.div`
  width: 90%; /* Padrão para telas menores */
  max-width: 800px;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: left;
  overflow-x: auto;

  @media (min-width: 1280px) {
    max-width: 1000px;
    min-width: 950px;
    padding: 3rem;
  }

  @media (min-width: 1440px) {
    max-width: 1200px;
    min-width: 1150px;
    padding: 4rem;
  }

  @media (min-width: 1920px) {
    max-width: 1600px;
    min-width: 1550px;
    padding: 5rem;
  }
`;


export const ActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export const ToggleSwitch = styled(Switch)``;

export const EditButton = styled(IconButton)`
  color: #007bff !important;
`;

export const DeleteButton = styled(IconButton)`
  color: #dc3545 !important;
`;

export const EmptyRow = styled.tr`
  height: 100px;
  text-align: center;
  color: #999;
  font-size: 16px;
`;


export const SearchContainer = styled.div`
  width: 70vw;
  display: flex;
   margin-top: 1rem;
  align-items: center;
  justify-content: space-between;
  gap: 10px; /* Adiciona um pequeno espaço entre os elementos */
  margin-bottom: 1rem;
`;

export const SearchInput = styled(TextField)`
  flex: 1;
`;

export const SelectFilter = styled(TextField)`
  width: 160px; /* Define o tamanho máximo */
`;


// export const SearchContainer = styled.div`
//   width: 70vw;
//   display: flex;
//   margin-top: 1rem;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 1rem;
// `;

// export const SearchInput = styled(TextField)`
//   flex: 1;
//   max-width: 500px;

// `;