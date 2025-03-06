import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3400/api/v1", // Altere para o endereço correto da sua API
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
