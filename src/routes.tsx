import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClientForm from "@pages/client/ClientForm";
import ClientList from "@pages/client/ClientList";
import PrivateRoute from "@components/PrivateRoute";
import Login from "@pages/auth/Login";
import Main from "@pages/main/Main";
import Layout from "@components/side_menu/Layout";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />


                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<Layout />}>
                        {/* <Route path="/" element={<Main />} /> */}
                        <Route path="/users" element={<ClientList />} />
                        <Route path="/user_register" element={<ClientForm />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
