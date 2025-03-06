import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClientForm from "@pages/client/ClientForm";
import ClientList from "@pages/client/ClientList";
import PrivateRoute from "@components/PrivateRoute";
import Login from "@pages/auth/Login";
import Main from "@pages/main/Main";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />


                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<Main />} />
                    <Route path="/users" element={<ClientList />} />
                    <Route path="/user_register" element={<ClientForm />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
