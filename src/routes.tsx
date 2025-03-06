import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClientForm from "./pages/client/clientForm";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ClientForm />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
