import { ClientDTO } from "../interfaces/client.interfaces";
import api from "../services/api";
import { toast } from "react-toastify";

/**
 * Cria um novo cliente
 */
export const createClient = async (clientData: ClientDTO) => {
    try {
        const response = await api.post("/client", clientData);
        toast.success("Cliente cadastrado com sucesso!");
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Erro ao cadastrar cliente.";
        toast.error(errorMessage);
        console.error("Erro ao cadastrar cliente:", error);
        throw error;
    }
};

/**
 * Atualiza um cliente existente
 */
export const updateClient = async (clientId: number, clientData: ClientDTO) => {
    try {
        const response = await api.put(`/client/${clientId}`, clientData);
        toast.success("Cliente atualizado com sucesso!");
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Erro ao atualizar cliente.";
        toast.error(errorMessage);
        console.error("Erro ao atualizar cliente:", error);
        throw error;
    }
};

/**
 * Busca um cliente pelo ID para edição
 */
export const getClientById = async (clientId: number) => {
    try {
        const response = await api.get(`/client/${clientId}`);
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Erro ao buscar dados do cliente.";
        toast.error(errorMessage);
        console.error("Erro ao buscar cliente:", error);
        throw error;
    }
};

/**
 * Ativa ou desativa o status de um cliente
 */
export const toggleStatus = async (clientId: number) => {
    try {
        await api.patch(`/client/${clientId}`);
        toast.success("Status do cliente atualizado!");
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Erro ao atualizar status do cliente.";
        toast.error(errorMessage);
        console.error("Erro ao atualizar status", error);
    }
};

/**
 * Deleta um cliente
 */
export const deleteClient = async (clientId: number) => {
    try {
        await api.delete(`/client/${clientId}`);
        toast.success("Cliente deletado com sucesso!");
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Erro ao deletar cliente.";
        toast.error(errorMessage);
        console.error("Erro ao deletar cliente", error);
    }
};
