import { CompanyDTO } from "../interfaces/company.interfaces";
import api from "./api";
import { toast } from "react-toastify";


export const createCompany = async (companyData: CompanyDTO) => {
    try {
        const response = await api.post("/company", companyData);
        toast.success("Empresa cadastrado com sucesso!");
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Erro ao cadastrar cliente.";
        toast.error(errorMessage);
        console.error("Erro ao cadastrar cliente:", error);
        throw error;
    }
};


export const updateCompany = async (companyId: number, companyData: CompanyDTO) => {
    try {
        const response = await api.put(`/company/${companyId}`, companyData);
        toast.success("Empresa atualizada com sucesso!");
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Erro ao atualizar a empresa.";
        toast.error(errorMessage);
        console.error("Erro ao atualizar a empresa:", error);
        throw error;
    }
};



export const getCompanyById = async (companyId: number) => {
    try {
        const response = await api.get(`/company/${companyId}`);
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Erro ao buscar empresa.";
        toast.error(errorMessage);
        console.error("Erro ao buscar empresa:", error);
        throw error;
    }
};




export const deleteCompany = async (companyId: number) => {
    try {
        await api.delete(`/company/${companyId}`);
        toast.success("Empresa deletada com sucesso!");
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Erro ao deletar a empresa.";
        toast.error(errorMessage);
        console.error("Erro ao deletar empresa", error);
    }
};
