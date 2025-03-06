import { useEffect, useState } from "react";
import api from "@services/api"; // Caso precise buscar o usuário via API
import { MainContainer, WelcomeMessage } from "./Main.style";

const Main = () => {
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        // Simulando busca do nome do usuário salvo no localStorage ou via API
        const storedUser = localStorage.getItem("user_name");

        if (storedUser) {
            setUserName(storedUser);
        } else {
            // Caso precise buscar via API (se tiver token salvo)
            const fetchUser = async () => {
                try {
                    const response = await api.get("/user/me"); // Ajuste conforme seu endpoint

                    setUserName(response.data.user_name);
                } catch (error) {
                    console.error("Erro ao buscar usuário:", error);
                }
            };

            fetchUser();
        }
    }, []);

    return (
        <MainContainer>
            <WelcomeMessage>
                Bem-vindo {userName ? `${userName}!` : "!"}
            </WelcomeMessage>
        </MainContainer>
    );
};

export default Main;
