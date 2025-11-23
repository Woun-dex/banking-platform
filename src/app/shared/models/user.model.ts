export interface LoginRequest {
    username : string;
    password ?: string;
}
export interface RegisterRequest {
    username : string;
    email : string;
    password : string;
    role ?: string;
}


export interface AuthResponse {
    token: string;
    userId: string;
}

export interface User {
    id: string;
    username: string;
    email: string;   
}


