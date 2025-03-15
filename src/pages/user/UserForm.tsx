import { useForm } from "react-hook-form";
import { TextField, Typography, Grid } from "@mui/material";
import { createUser, getUserById, updateUser } from "@services/userService";
import { Container, FileInputContainer, FileName, FormWrapper, HiddenFileInput, StyledButton, StyledCandelButton, StyledFileButton, StyledSelect } from "./UserForm.styles";
import { Profile, UserFormInputs } from "@interfaces/user.interfaces";
import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import api from "@services/api";

const UserForm = () => {
    const { register, handleSubmit, reset, setValue, control } = useForm<UserFormInputs>();
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const navigate = useNavigate();
    const { userId } = useParams();
    const [loading, setLoading] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    // const [profileId, setProfileId] = useState('');


    const fetchProfiles = async () => {
        try {
            const response = await api.get(`/profile`);

            setProfiles(response.data);

        } catch (error) {
            toast.error("Erro ao carregar os dados do perfil.");
        }
    };


    useEffect(() => {
        fetchProfiles();
    }, []);

    // Se houver um userId, busca os dados do 
    useEffect(() => {
        if (userId) {
            setLoading(true);
            getUserById(Number(userId))
                .then((response) => {

                    console.log(response.user_avatar);

                    const user = response;
                    setValue("user_name", user.user_name);
                    setValue("user_email", user.user_email);
                    setValue("user_password", user.user_password);
                    setValue("user_avatar", user.user_avatar);
                    // setSelectedFile(user.user_avatar)
                    setValue("user_profile_id", user.user_profile_id);

                })
                .catch(() => {
                    toast.error("Erro ao carregar os dados do usere.");
                })
                .finally(() => setLoading(false));
        }
    }, [userId, setValue]);

    const cancel = () => {
        navigate("/users");
    };

    const onSubmit = async (data: UserFormInputs) => {
        try {
            const formData = new FormData();

            // Adiciona os dados do usuário
            formData.append("user_name", data.user_name);
            formData.append("user_email", data.user_email);
            formData.append("user_password", data.user_password);
            formData.append("user_profile_id", selectedProfile);

            // Adiciona a imagem, se existir
            if (selectedFile) {
                formData.append("file", selectedFile);
            }

            if (userId) {
                await updateUser(Number(userId), formData);
                toast.success("Usuário atualizado com sucesso!");
            } else {
                await createUser(formData);
                toast.success("Usuário cadastrado com sucesso!");
            }

            navigate("/users");
            reset();
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Erro desconhecido ao cadastrar usuário";
            toast.error(errorMessage);
        }
    };




    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]); // ✅ Armazena o arquivo real, não apenas o nome
        } else {
            setSelectedFile(null);
        }
    };


    return (
        <Container maxWidth="sm">
            <FormWrapper>
                <Typography variant="h4" gutterBottom>
                    {userId ? "Editar Usuário" : "Cadastro de Usuário"}
                </Typography>
                {loading ? (
                    <Typography>Carregando...</Typography>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <TextField fullWidth label="Nome" {...register("user_name")} />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField fullWidth label="Email" {...register("user_email")} />
                            </Grid>

                            {!userId && <Grid item xs={6}>
                                <TextField fullWidth label="Senha" {...register("user_password")} />
                            </Grid>}

                            <Grid item xs={6}>
                                <StyledSelect value={selectedProfile} onChange={(e) => setSelectedProfile(e.target.value)}>
                                    <option value="">Selecione um perfil</option>
                                    {profiles.map((profile) => (
                                        <option key={profile.profile_id} value={profile.profile_id}>
                                            {profile.profile_name}
                                        </option>
                                    ))}
                                </StyledSelect>
                            </Grid>

                            <Grid item xs={6}>
                                <FileInputContainer>
                                    <HiddenFileInput
                                        type="file"
                                        accept="image/*"
                                        id="fileUpload"
                                        {...register("user_avatar")}
                                        onChange={handleFileChange}
                                    />
                                    <StyledFileButton htmlFor="fileUpload">Escolher Imagem</StyledFileButton>
                                    <FileName>{selectedFile ? selectedFile.name : "Nenhum arquivo escolhido"}</FileName>
                                </FileInputContainer>
                            </Grid>


                            <Grid item xs={12} style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                                <StyledCandelButton onClick={cancel} variant="contained" fullWidth>
                                    Cancelar
                                </StyledCandelButton>
                                <StyledButton type="submit" variant="contained" fullWidth>
                                    {userId ? "Salvar Alterações" : "Cadastrar"}
                                </StyledButton>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </FormWrapper>
        </Container>
    );
};

export default UserForm;
