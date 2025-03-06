import axios from "axios";
import { getToken } from "./authService";

const api = axios.create({
    baseURL: "http://localhost:3400/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

// Adiciona o token em todas as requisições automaticamente
api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
