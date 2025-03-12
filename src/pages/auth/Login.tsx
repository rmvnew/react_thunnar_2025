import { useState } from "react";
import { useAuth } from "@contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button } from "@mui/material";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("rmvnew@gmail.com");
    const [password, setPassword] = useState("12345");


    const handleLogin = async () => {
        try {
            console.log("🟢 Tentando login com:", { email, password });
            await login(email, password);
            console.log("✅ Redirecionando para /home...");
            navigate("/home");
        } catch (error) {

        }
    };

    return (
        <Container maxWidth="sm">
            <h2>Login</h2>

            <TextField
                label="Email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                label="Senha"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
                Entrar
            </Button>
        </Container>
    );
};

export default Login;
