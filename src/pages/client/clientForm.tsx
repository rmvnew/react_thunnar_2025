import { useForm } from "react-hook-form";
import { TextField, Typography, Grid } from "@mui/material";
import { createClient } from "@services/clientService";
import { Container, FormWrapper, StyledButton, StyledSelect } from "./clientForm.styles";
import { ClientFormInputs } from "@interfaces/client.interfaces";
import { useState } from "react";
import CpfInput from "@components/CpfInput";
import CnpjInput from "@components/CnpjInput";

const ClientForm = () => {
    const { register, handleSubmit, reset, control } = useForm<ClientFormInputs>();
    const [isCompany, setIsCompany] = useState(false);

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

            console.log('>>>>', clientData);

            await createClient(clientData);
            alert("Cliente cadastrado com sucesso!");
            reset();
        } catch (error) {
            console.error("Erro ao cadastrar cliente", error);
            alert("Erro ao cadastrar cliente");
        }
    };

    return (
        <Container maxWidth="sm">
            <FormWrapper>
                <Typography variant="h4" gutterBottom>
                    Cadastro de Cliente
                </Typography>
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
                        <Grid item xs={12}>
                            <StyledButton type="submit" variant="contained" fullWidth>
                                Cadastrar
                            </StyledButton>
                        </Grid>
                    </Grid>
                </form>
            </FormWrapper>
        </Container>
    );
};

export default ClientForm;