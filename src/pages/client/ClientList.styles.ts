import styled from "styled-components";
import { Button as MuiButton, TextField, IconButton, Switch } from "@mui/material";

export const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 1rem;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const SearchInput = styled(TextField)`
  flex: 1;
  max-width: 500px;
  
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
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  overflow-x: auto;
  display: flex;
  justify-content: center;
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
