import { createContext, useContext, useState, useEffect } from "react";
import { login as loginService, logout as logoutService, getToken } from "@services/authService";

interface AuthContextProps {
    user: any;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const token = getToken();
        if (token) {
            setUser({ token }); // Aqui podemos buscar mais dados do usuário se necessário
        }
    }, []);

    const login = async (email: string, password: string) => {
        const data = await loginService(email, password);
        setUser({ token: data.access_token });
    };

    const logout = () => {
        logoutService();
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
