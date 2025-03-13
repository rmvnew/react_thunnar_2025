import { format } from "date-fns";
import * as dateFnsTz from "date-fns-tz";

export const formatDate = (isoDate: string, timeZone = "America/Sao_Paulo") => {
    try {
        const zonedDate = dateFnsTz.toZonedTime(new Date(isoDate), timeZone);
        return format(zonedDate, "dd/MM/yyyy HH:mm");
    } catch (error) {
        console.error("Erro ao formatar data:", error);
        return "Data inválida";
    }
};
