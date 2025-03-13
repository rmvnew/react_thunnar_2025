

export interface userDTO {
    user_name: string;
    user_email: string;
    user_avatar: string;
    user_password: string;
    user_profile_id: string
}


export interface userFormInputs {
    user_name: string;
    user_cpf: string;
    user_cnpj: string;
    user_is_company: boolean;
    user_status: string;
    phone_number: string;
    address_city: string;
    address_state: string;
    address_street: string;
    address_neighborhood: string;
    address_number: string;
    address_zipcod: string;
}

export interface User {
    user_id: number;
    user_name: string;
    user_email: string;
    user_recovery_code: string;
    user_password: string;
    user_first_access: string;
    user_refresh_token: string;
    created_at: string
    status: boolean
    user_avatar: string;
}

