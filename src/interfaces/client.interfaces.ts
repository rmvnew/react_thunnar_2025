

export interface ClientDTO {
    client_name: string;
    client_cpf: string;
    client_cnpj: string;
    client_is_company: boolean;
    phone: {
        phone_number: string;
    };
    address: {
        address_city: string;
        address_state: string;
        address_street: string;
        address_neighborhood: string;
        address_number: string;
        address_zipcod: string;
    };
}


export interface ClientFormInputs {
    client_name: string;
    client_cpf: string;
    client_cnpj: string;
    client_is_company: boolean;
    client_status: string;
    phone_number: string;
    address_city: string;
    address_state: string;
    address_street: string;
    address_neighborhood: string;
    address_number: string;
    address_zipcod: string;
}

export interface Client {
    client_id: number;
    client_name: string;
    client_cpf: string;
    client_cnpj?: string;
    client_status: boolean
    client_is_company: boolean;
    phone?: Phone;
}

interface Phone {
    phone_number: string;
}