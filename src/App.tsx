import React from "react";
import AppRoutes from "./routes";
import { GlobalStyle } from "@pages/client/clientForm.styles";

const App: React.FC = () => {
  return <>
    <GlobalStyle />
    <AppRoutes />
  </>
};

export default App;
