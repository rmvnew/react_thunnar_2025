import React from "react";
import AppRoutes from "./routes";
import { GlobalStyle } from "@pages/client/ClientForm.styles";
import { AuthProvider } from "@contexts/AuthContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <GlobalStyle />
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
