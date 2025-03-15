import api from "./api";
import { toast } from "react-toastify";


export const createUser = async (userData: FormData) => {
    try {
        const response = await api.post("/user", userData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        toast.success("Usuário cadastrado com sucesso!");
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Erro ao cadastrar usuário.";
        toast.error(errorMessage);
        console.error("Erro ao cadastrar usuário:", error);
        throw error;
    }
};

export const updateUser = async (userId: number, userData: FormData) => {
    try {
        const response = await api.put(`/user/${userId}`, userData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        toast.success("Usuário atualizado com sucesso!");
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Erro ao atualizar usuário.";
        toast.error(errorMessage);
        console.error("Erro ao atualizar usuário:", error);
        throw error;
    }
};



export const getUserById = async (userId: number) => {
    try {
        const response = await api.get(`/user/${userId}`);
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Erro ao buscar usuário.";
        toast.error(errorMessage);
        console.error("Erro ao buscar usuário:", error);
        throw error;
    }
};

export const toggleStatus = async (userId: number) => {
    try {
        await api.patch(`/user/${userId}`);
        toast.success("Status do usuário atualizado!");
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Erro ao atualizar status do usuário.";
        toast.error(errorMessage);
        console.error("Erro ao atualizar status", error);
    }
};


export const deleteUser = async (userId: number) => {
    try {
        await api.delete(`/user/${userId}`);
        toast.success("usuário deletada com sucesso!");
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Erro ao deletar a usuário.";
        toast.error(errorMessage);
        console.error("Erro ao deletar usuário", error);
    }
};
