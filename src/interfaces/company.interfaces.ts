

export interface CompanyDTO {
    company_name: string;
    company_cnpj: string;
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


export interface CompanyFormInputs {
    company_name: string;
    company_cnpj: string;
    phone_number: string;
    address_city: string;
    address_state: string;
    address_street: string;
    address_neighborhood: string;
    address_number: string;
    address_zipcod: string;
}

export interface Company {
    company_id: number;
    company_name: string;
    company_cnpj: string;
    company_status: boolean
    created_at: string
    phone: Phone;
}

interface Phone {
    phone_number: string;
}