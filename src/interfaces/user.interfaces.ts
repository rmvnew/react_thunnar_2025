

export interface UserDTO {
    user_name: string;
    user_email: string;
    user_avatar: string;
    user_password: string;
    user_profile_id: string
}


export interface UserFormInputs {
    user_name: string;
    user_email: string;
    user_avatar: string;
    user_password: string;
    user_profile_id: string
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


export interface Profile {
    profile_id: string;
    profile_name: string;
}