import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, TextField, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "@services/api";
import { toggleStatus, deleteClient } from "@services/clientService";
import { Edit, Delete, ArrowBack } from "@mui/icons-material";
import {
    ActionsContainer,
    AddUserButton,
    DeleteButton,
    EditButton,
    EmptyRow,
    SearchContainer,
    SearchInput,
    ToggleSwitch,
    BackButton,
    SelectFilter
} from "./ClientList.styles";
import { Client } from "@interfaces/client.interfaces";

const ClientList = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    // Estados de Paginação
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 8;

    // Estados de Ordenação
    const [orderBy, setOrderBy] = useState("DATE"); // Ordenação padrão
    const [sort, setSort] = useState("ASC"); // Crescente por padrão

    const fetchClients = async (page: number) => {
        try {
            const response = await api.get(`/client`, {
                params: { page, limit, orderBy, sort }
            });

            setClients(response.data.items);
            setTotalPages(response.data.meta.totalPages);
            setPage(response.data.meta.currentPage);
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
        }
    };

    useEffect(() => {
        fetchClients(page);
    }, [page, orderBy, sort]);

    const handleToggleStatus = async (clientId: number) => {
        await toggleStatus(clientId);
        fetchClients(page);
    };

    const handleDeleteClient = async (clientId: number) => {
        await deleteClient(clientId);
        fetchClients(page);
    };

    return (
        <div>
            <BackButton variant="contained" onClick={() => navigate("/home")}>
                <ArrowBack /> Voltar
            </BackButton>


            <SearchContainer>
                {/* Campo de busca */}
                <SearchInput
                    label="Buscar Cliente"
                    variant="outlined"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {/* Ordenação por Nome ou Data */}
                <SelectFilter
                    select
                    label="Ordenar por"
                    value={orderBy}
                    onChange={(e) => setOrderBy(e.target.value)}
                    SelectProps={{ native: true }}
                >
                    <option value="DATE">Data</option>
                    <option value="NAME">Nome</option>
                </SelectFilter>

                {/* Ordenação ASC ou DESC */}
                <SelectFilter
                    select
                    label="Direção"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    SelectProps={{ native: true }}
                >
                    <option value="ASC">Crescente</option>
                    <option value="DESC">Decrescente</option>
                </SelectFilter>

                {/* Botão Novo Cliente */}
                <AddUserButton variant="contained" onClick={() => navigate("/user_register")}>
                    Novo Cliente
                </AddUserButton>
            </SearchContainer>


            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>CPF / CNPJ</TableCell>
                            <TableCell>Telefone</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {clients.length > 0 ? (
                            clients.map((client) => (
                                <TableRow key={client.client_id}>
                                    <TableCell>{client.client_id}</TableCell>
                                    <TableCell>{client.client_name}</TableCell>
                                    <TableCell>{client.client_is_company ? client.client_cnpj : client.client_cpf}</TableCell>
                                    <TableCell>{client.phone?.phone_number || "N/A"}</TableCell>
                                    <TableCell>
                                        <ActionsContainer>
                                            <ToggleSwitch
                                                checked={client.client_status}
                                                onChange={() => handleToggleStatus(client.client_id)}
                                            />
                                            <EditButton onClick={() => navigate(`/edit-client/${client.client_id}`)}>
                                                <Edit />
                                            </EditButton>
                                            <DeleteButton onClick={() => handleDeleteClient(client.client_id)}>
                                                <Delete />
                                            </DeleteButton>
                                        </ActionsContainer>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <EmptyRow>
                                <TableCell colSpan={4}>Nenhum cliente cadastrado</TableCell>
                            </EmptyRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Paginação */}
            <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
                style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
            />
        </div>
    );
};

export default ClientList;
