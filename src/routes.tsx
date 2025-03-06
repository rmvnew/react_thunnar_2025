import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClientForm from "./pages/client/ClientForm";
import ClientList from "./pages/client/ClientList";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ClientList />} />
                <Route path="/user_register" element={<ClientForm />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
