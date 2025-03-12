import { createContext, useContext, useState, useEffect } from "react";
import { login as loginService, logout as logoutService, getToken } from "@services/authService";

interface AuthUser {
    name: string;
    email: string;
    profile: string;
    avatar?: string;
}
interface AuthContextProps {
    user: AuthUser | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<{ name: string; email: string; profile: string; avatar: string; } | null>(null);

    useEffect(() => {
        const token = getToken();
        const storedName = localStorage.getItem("user_name");
        const storedEmail = localStorage.getItem("user_email");
        const storedProfile = localStorage.getItem("user_profile");
        const storedAvatar = localStorage.getItem("user_avatar");

        if (token && storedName && storedEmail && storedProfile && storedAvatar) {
            console.log("✅ Usuário autenticado encontrado:", { storedName, storedEmail, storedProfile });

            setUser({ name: storedName, email: storedEmail, profile: storedProfile, avatar: storedAvatar });

        } else {
            console.log("⚠️ Nenhum usuário autenticado encontrado.");
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const data = await loginService(email, password);

            console.log("🔹 Login bem-sucedido! Dados recebidos:", data);

            localStorage.setItem("auth_token", data.access_token);
            localStorage.setItem("user_name", data.name);
            localStorage.setItem("user_email", data.login);
            localStorage.setItem("user_profile", data.profile);
            localStorage.setItem("user_avatar", data.avatar);

            setUser({ name: data.name, email: data.login, profile: data.profile, avatar: data.avatar });

        } catch (error) {

            throw new Error("Usuário ou senha inválidos");
        }
    };

    const logout = () => {
        console.log("🚪 Realizando logout...");
        logoutService();
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_name");
        localStorage.removeItem("user_email");
        localStorage.removeItem("user_profile");
        localStorage.removeItem("user_avatar");

        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
};
