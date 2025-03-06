
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

export const toggleStatus = async (clientId: number) => {

    try {
        await api.patch(`/client/${clientId}`);

    } catch (error) {
        console.error("Erro ao atualizar status", error);

    }
};

export const editClient = (clientId: number) => {
    alert(`Redirecionando para edição do cliente ${clientId}`);
    // Aqui pode ser implementado o redirecionamento para uma tela de edição
};

export const deleteClient = async (clientId: number) => {
    try {
        await api.delete(`/client/${clientId}`);

    } catch (error) {
        console.error("Erro ao deletar cliente", error);

    }
};
