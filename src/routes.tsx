import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClientForm from "@pages/client/ClientForm";
import ClientList from "@pages/client/ClientList";
import PrivateRoute from "@components/PrivateRoute";
import Login from "@pages/auth/Login";
import Main from "@pages/main/Main";
import Layout from "@components/side_menu/Layout";
import ToastProvider from "@components/toast";
import CompanyList from "@pages/company/CompanyList";
import CompanyForm from "@pages/company/CompanyForm";
import UserForm from "@pages/user/UserForm";
import UserList from "@pages/user/UserList";

const AppRoutes = () => {
    return (
        <Router>
            <ToastProvider />
            <Routes>
                <Route path="/login" element={<Login />} />


                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<Layout />}>
                        <Route path="/home" element={<Main />} />
                        <Route path="/companies" element={<CompanyList />} />
                        <Route path="/clients" element={<ClientList />} />
                        <Route path="/users" element={<UserList />} />
                        <Route path="/edit-client/:clientId" element={<ClientForm />} />
                        <Route path="/edit-company/:companyId" element={<CompanyForm />} />
                        <Route path="/edit-user/:userId" element={<UserForm />} />
                        <Route path="/client_register" element={<ClientForm />} />
                        <Route path="/company_register" element={<CompanyForm />} />
                        <Route path="/user_register" element={<UserForm />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
