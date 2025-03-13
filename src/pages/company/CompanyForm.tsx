import { useForm } from "react-hook-form";
import { TextField, Typography, Grid } from "@mui/material";
import { createCompany, getCompanyById, updateCompany } from "@services/companyService";
import { Container, FormWrapper, StyledButton, StyledCandelButton } from "./CompanyForm.styles";
import { CompanyFormInputs } from "@interfaces/company.interfaces";
import { useState, useEffect } from "react";
import CnpjInput from "@components/CnpjInput";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';

const CompanyForm = () => {
    const { register, handleSubmit, reset, setValue, control } = useForm<CompanyFormInputs>();

    const navigate = useNavigate();
    const { companyId } = useParams(); // Captura o ID do companye na URL
    const [loading, setLoading] = useState(false);

    // Se houver um companyId, busca os dados do companye
    useEffect(() => {
        if (companyId) {
            setLoading(true);
            getCompanyById(Number(companyId))
                .then((response) => {

                    console.log(response);

                    const company = response;
                    setValue("company_name", company.company_name);
                    setValue("company_cnpj", company.company_cnpj);
                    setValue("phone_number", company.phone.phone_number);
                    setValue("address_zipcod", company.address.address_zipcod);
                    setValue("address_city", company.address.address_city);
                    setValue("address_state", company.address.address_state);
                    setValue("address_street", company.address.address_street);
                    setValue("address_neighborhood", company.address.address_neighborhood);
                    setValue("address_number", company.address.address_number);

                })
                .catch(() => {
                    toast.error("Erro ao carregar os dados do companye.");
                })
                .finally(() => setLoading(false));
        }
    }, [companyId, setValue]);

    const cancel = () => {
        navigate("/companies");
    };

    const onSubmit = async (data: CompanyFormInputs) => {
        try {
            const companyData = {
                company_name: data.company_name,
                company_cnpj: data.company_cnpj,
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

            if (companyId) {
                // Atualiza o companye existente
                await updateCompany(Number(companyId), companyData);
                toast.success("companye atualizado com sucesso!");
            } else {
                // Cria um novo companye
                await createCompany(companyData);
                toast.success("companye cadastrado com sucesso!");
            }

            navigate("/companys");
            reset();
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Erro desconhecido ao cadastrar companye";
            toast.error(errorMessage);
        }
    };

    return (
        <Container maxWidth="sm">
            <FormWrapper>
                <Typography variant="h4" gutterBottom>
                    {companyId ? "Editar Empresa" : "Cadastro de Empresa"}
                </Typography>
                {loading ? (
                    <Typography>Carregando...</Typography>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Nome" {...register("company_name")} />
                            </Grid>

                            <Grid item xs={6}>
                                <CnpjInput control={control} name="company_cnpj" />
                            </Grid>

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
                                    {companyId ? "Salvar Alterações" : "Cadastrar"}
                                </StyledButton>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </FormWrapper>
        </Container>
    );
};

export default CompanyForm;
