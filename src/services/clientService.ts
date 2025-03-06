
import { ClientDTO } from "../interfaces/client.interfaces";
import api from "../services/api";

export const createClient = async (clientData: ClientDTO) => {
    try {
        const response = await api.post("/client", clientData);
        return response.data;
    } catch (error) {
        console.error("Erro ao cadastrar cliente:", error);
        throw error;
    }
}