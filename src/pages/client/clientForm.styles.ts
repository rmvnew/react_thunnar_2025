import styled, { createGlobalStyle } from "styled-components";
import { Container as MuiContainer, Button as MuiButton } from "@mui/material";

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

export const Container = styled(MuiContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #f5f5f5;
  color: #333;
`;

export const FormWrapper = styled.div`
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

export const StyledGrid = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;

export const StyledButton = styled(MuiButton)`
  background-color: #007bff !important;
  color: white !important;
  font-weight: bold;
  &:hover {
    background-color: #0056b3 !important;
  }
`;

export const StyledSelect = styled.select`
  width: 100%;
  height: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: white;
  outline: none;
  appearance: none;
  cursor: pointer;
  color: #333;
  
  option[value="false"] {
    selected: true;
  }
`;