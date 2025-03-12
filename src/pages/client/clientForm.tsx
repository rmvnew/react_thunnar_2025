import { useForm } from "react-hook-form";
import { TextField, Typography, Grid } from "@mui/material";
import { createClient, getClientById, updateClient } from "@services/clientService";
import { Container, FormWrapper, StyledButton, StyledCandelButton, StyledSelect } from "./ClientForm.styles";
import { ClientFormInputs } from "@interfaces/client.interfaces";
import { useState, useEffect } from "react";
import CpfInput from "@components/CpfInput";
import CnpjInput from "@components/CnpjInput";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';

const ClientForm = () => {
    const { register, handleSubmit, reset, setValue, control } = useForm<ClientFormInputs>();
    const [isCompany, setIsCompany] = useState(false);
    const navigate = useNavigate();
    const { clientId } = useParams(); // Captura o ID do cliente na URL
    const [loading, setLoading] = useState(false);

    // Se houver um clientId, busca os dados do cliente
    useEffect(() => {
        if (clientId) {
            setLoading(true);
            getClientById(Number(clientId))
                .then((response) => {

                    console.log(response);

                    const client = response;
                    setValue("client_name", client.client_name);
                    setValue("client_cpf", client.client_cpf);
                    setValue("client_cnpj", client.client_cnpj);
                    setValue("phone_number", client.phone.phone_number);
                    setValue("address_zipcod", client.address.address_zipcod);
                    setValue("address_city", client.address.address_city);
                    setValue("address_state", client.address.address_state);
                    setValue("address_street", client.address.address_street);
                    setValue("address_neighborhood", client.address.address_neighborhood);
                    setValue("address_number", client.address.address_number);
                    setIsCompany(client.client_is_company);
                })
                .catch(() => {
                    toast.error("Erro ao carregar os dados do cliente.");
                })
                .finally(() => setLoading(false));
        }
    }, [clientId, setValue]);

    const cancel = () => {
        navigate("/clients");
    };

    const onSubmit = async (data: ClientFormInputs) => {
        try {
            const clientData = {
                client_name: data.client_name,
                client_cpf: data.client_cpf,
                client_cnpj: isCompany ? data.client_cnpj : "",
                client_is_company: isCompany,
                phone: { phone_number: data.phone_number },
                address: {
                    address_zipcod: data.address_zipcod,
                    address_city: data.address_city,
                    address_state: data.address_state,
                    address_street: data.address_street,
                    address_neighborhood: data.address_neighborhood,
                    address_number: data.address_number,
                },
            };

            if (clientId) {
                // Atualiza o cliente existente
                await updateClient(Number(clientId), clientData);
                toast.success("Cliente atualizado com sucesso!");
            } else {
                // Cria um novo cliente
                await createClient(clientData);
                toast.success("Cliente cadastrado com sucesso!");
            }

            navigate("/clients");
            reset();
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Erro desconhecido ao cadastrar cliente";
            toast.error(errorMessage);
        }
    };

    return (
        <Container maxWidth="sm">
            <FormWrapper>
                <Typography variant="h4" gutterBottom>
                    {clientId ? "Editar Cliente" : "Cadastro de Cliente"}
                </Typography>
                {loading ? (
                    <Typography>Carregando...</Typography>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Nome" {...register("client_name")} />
                            </Grid>

                            <Grid item xs={6}>
                                <StyledSelect onChange={(e) => setIsCompany(e.target.value === "true")}>
                                    <option value="false">Pessoa Física</option>
                                    <option value="true">Empresa</option>
                                </StyledSelect>
                            </Grid>

                            <Grid item xs={6}>
                                <CpfInput control={control} name="client_cpf" />
                            </Grid>

                            {isCompany && (
                                <Grid item xs={6}>
                                    <CnpjInput control={control} name="client_cnpj" />
                                </Grid>
                            )}

                            <Grid item xs={6}>
                                <TextField fullWidth label="Telefone" {...register("phone_number")} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="CEP" {...register("address_zipcod")} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Estado" {...register("address_state")} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Cidade" {...register("address_city")} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Bairro" {...register("address_neighborhood")} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Rua" {...register("address_street")} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Número" {...register("address_number")} />
                            </Grid>
                            <Grid item xs={12} style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                                <StyledCandelButton onClick={cancel} variant="contained" fullWidth>
                                    Cancelar
                                </StyledCandelButton>
                                <StyledButton type="submit" variant="contained" fullWidth>
                                    {clientId ? "Salvar Alterações" : "Cadastrar"}
                                </StyledButton>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </FormWrapper>
        </Container>
    );
};

export default ClientForm;
