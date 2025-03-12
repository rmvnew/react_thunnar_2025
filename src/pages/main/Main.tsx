import { useEffect, useState } from "react";
import api from "@services/api"; // Caso precise buscar o usuário via API
import { MainContainer, WelcomeMessage } from "./Main.style";

const Main = () => {
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user_name");

        if (storedUser) {
            setUserName(storedUser);
        } else {
            const fetchUser = async () => {
                try {
                    const response = await api.get("/user/me");
                    setUserName(response.data.user_name);

                    localStorage.setItem("user_name", response.data.user_name); // 🔥 Salva no localStorage
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
