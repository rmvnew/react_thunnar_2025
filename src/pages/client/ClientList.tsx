
// import { useState, useEffect } from "react";
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import api from "@services/api";
// import { toggleStatus, deleteClient } from "@services/clientService";
// import { Edit, Delete } from "@mui/icons-material";
// import { ActionsContainer, AddUserButton, DeleteButton, EditButton, EmptyRow, SearchContainer, SearchInput, ToggleSwitch } from "./ClientList.styles";
// import { Client } from "@interfaces/client.interfaces";

// const ClientList = () => {
//     const [clients, setClients] = useState<Client[]>([]);
//     const [search, setSearch] = useState("");
//     const navigate = useNavigate();
//     const [reload, setReload] = useState(false); // ⬅️ Estado para recarregar lista

//     const fetchClients = async () => {
//         try {
//             const response = await api.get("/client");
//             setClients(response.data.items);
//         } catch (error) {
//             console.error("Erro ao buscar clientes:", error);
//         }
//     };

//     useEffect(() => {
//         fetchClients();
//     }, [reload]); // ⬅️ A lista será atualizada sempre que `reload` mudar

//     const handleToggleStatus = async (clientId: number) => {
//         await toggleStatus(clientId);
//         setReload((prev) => !prev); // ⬅️ Alterna o estado para forçar recarregamento
//     };

//     const handleDeleteClient = async (clientId: number) => {
//         await deleteClient(clientId);
//         setReload((prev) => !prev); // ⬅️ Alterna o estado para forçar recarregamento
//     };

//     return (
//         <div>
//             <SearchContainer>
//                 <SearchInput
//                     label="Buscar Cliente"
//                     variant="outlined"
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                 />
//                 <AddUserButton variant="contained" onClick={() => navigate("/user_register")}>
//                     Novo Cliente
//                 </AddUserButton>

//             </SearchContainer>

//             <TableContainer component={Paper}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Nome</TableCell>
//                             <TableCell>CPF / CNPJ</TableCell>
//                             <TableCell>Telefone</TableCell>
//                             <TableCell>Ações</TableCell>
//                         </TableRow>
//                     </TableHead>

//                     <TableBody>
//                         {clients.length > 0 ? (
//                             clients.map((client) => (
//                                 <TableRow key={client.client_id}>
//                                     <TableCell>{client.client_name}</TableCell>
//                                     <TableCell>{client.client_is_company ? client.client_cnpj : client.client_cpf}</TableCell>
//                                     <TableCell>{client.phone?.phone_number || "N/A"}</TableCell>
//                                     <TableCell>
//                                         <ActionsContainer>
//                                             <ToggleSwitch checked={client.client_status} onChange={() => handleToggleStatus(client.client_id)} />
//                                             <EditButton onClick={() => navigate(`/edit-client/${client.client_id}`)}>
//                                                 <Edit />
//                                             </EditButton>
//                                             <DeleteButton onClick={() => handleDeleteClient(client.client_id)}>
//                                                 <Delete />
//                                             </DeleteButton>
//                                         </ActionsContainer>
//                                     </TableCell>
//                                 </TableRow>
//                             ))
//                         ) : (
//                             <EmptyRow>
//                                 <TableCell colSpan={4}>Nenhum cliente cadastrado</TableCell>
//                             </EmptyRow>
//                         )}
//                     </TableBody>

//                 </Table>
//             </TableContainer>
//         </div>
//     );
// };

// export default ClientList;


import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "@services/api";
import { toggleStatus, deleteClient } from "@services/clientService";
import { Edit, Delete, ArrowBack } from "@mui/icons-material"; // ⬅️ Ícone de voltar
import {
    ActionsContainer,
    AddUserButton,
    DeleteButton,
    EditButton,
    EmptyRow,
    SearchContainer,
    SearchInput,
    ToggleSwitch,
    BackButton // ⬅️ Importando o botão de voltar 
} from "./ClientList.styles";
import { Client } from "@interfaces/client.interfaces";

const ClientList = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const [reload, setReload] = useState(false); // ⬅️ Estado para recarregar lista

    const fetchClients = async () => {
        try {
            const response = await api.get("/client");
            setClients(response.data.items);
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
        }
    };

    useEffect(() => {
        fetchClients();
    }, [reload]); // ⬅️ Atualiza lista ao alterar `reload`

    const handleToggleStatus = async (clientId: number) => {
        await toggleStatus(clientId);
        setReload((prev) => !prev);
    };

    const handleDeleteClient = async (clientId: number) => {
        await deleteClient(clientId);
        setReload((prev) => !prev);
    };

    return (
        <div>
            <BackButton variant="contained" onClick={() => navigate("/home")}>
                <ArrowBack /> Voltar
            </BackButton>

            <SearchContainer>
                {/* Botão de voltar */}

                {/* Campo de busca */}
                <SearchInput
                    label="Buscar Cliente"
                    variant="outlined"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {/* Botão de adicionar novo cliente */}
                <AddUserButton variant="contained" onClick={() => navigate("/user_register")}>
                    Novo Cliente
                </AddUserButton>
            </SearchContainer>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
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
        </div>
    );
};

export default ClientList;
