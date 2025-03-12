import api from "./api";

export const login = async (email: string, password: string) => {

    console.log(email);
    console.log(password);

    try {
        const response = await api.post("/auth/login", { email, password });
        const { access_token } = response.data;

        console.log("🔍 Resposta da API no login:", response.data); // 🚀 Verificando a resposta

        if (access_token) {
            localStorage.setItem("token", access_token);
        }

        return response.data;
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem("token");
};

export const getToken = () => {
    return localStorage.getItem("token");
};
