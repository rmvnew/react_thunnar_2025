import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "@services/api";
import { toggleStatus, deleteUser } from "@services/userService";
import { Edit, Delete, ArrowBack } from "@mui/icons-material";
import {
    ActionsContainer,
    AddUserButton,
    DeleteButton,
    EditButton,
    EmptyRow,
    SearchContainer,
    SearchInput,
    SelectFilter,
    ToggleSwitch,
    BackButton
} from "./UserList.styles";
import { User } from "@interfaces/user.interfaces";
import { formatDate } from "../../common/utils/format_date";

const UserList = () => {
    const [users, setusers] = useState<User[]>([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    // Estados de Paginação e Ordenação
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 8;
    const [orderBy, setOrderBy] = useState("DATE");
    const [sort, setSort] = useState("ASC");

    const fetchusers = async (page: number) => {
        try {
            const response = await api.get(`/user`, {
                params: { page, limit, orderBy, sort, user_name: search }
            });

            setusers(response.data.items);
            setTotalPages(response.data.meta.totalPages);
            setPage(response.data.meta.currentPage);
        } catch (error) {
            console.error("Erro ao buscar useres:", error);
        }
    };

    useEffect(() => {
        fetchusers(page);
    }, [page, orderBy, sort]);

    // Busca automática ao digitar no campo de busca (com debounce de 500ms)
    useEffect(() => {
        const delaySearch = setTimeout(() => {
            fetchusers(1); // Sempre busca a partir da página 1 ao pesquisar
        }, 900);

        return () => clearTimeout(delaySearch);
    }, [search]);

    const handleToggleStatus = async (userId: number) => {
        await toggleStatus(userId);
        fetchusers(page);
    };

    const handleDeleteuser = async (userId: number) => {
        await deleteUser(userId);
        fetchusers(page);
    };

    return (
        <div>
            <BackButton variant="contained" onClick={() => navigate("/home")}>
                <ArrowBack /> Voltar
            </BackButton>

            <SearchContainer>
                {/* Campo de busca */}
                <SearchInput
                    label="Buscar usuário"
                    variant="outlined"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Digite o nome do usuário..."
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

                {/* Botão Novo usere */}
                <AddUserButton variant="contained" onClick={() => navigate("/user_register")}>
                    Novo usuário
                </AddUserButton>
            </SearchContainer>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>EMAIL</TableCell>
                            <TableCell>Data Cadastro</TableCell>
                            <TableCell>STATUS</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <TableRow key={user.user_id}>
                                    <TableCell>{user.user_id}</TableCell>
                                    <TableCell>{user.user_name}</TableCell>
                                    <TableCell>{user.user_email}</TableCell>
                                    <TableCell>{formatDate(user.created_at)}</TableCell>
                                    <TableCell>{user.status}</TableCell>
                                    <TableCell>
                                        <ActionsContainer>
                                            <ToggleSwitch
                                                checked={user.status}
                                                onChange={() => handleToggleStatus(user.user_id)}
                                            />
                                            <EditButton onClick={() => navigate(`/edit-user/${user.user_id}`)}>
                                                <Edit />
                                            </EditButton>
                                            <DeleteButton onClick={() => handleDeleteuser(user.user_id)}>
                                                <Delete />
                                            </DeleteButton>
                                        </ActionsContainer>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <EmptyRow>
                                <TableCell colSpan={4}>Nenhum registro encontrado</TableCell>
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

export default UserList;
