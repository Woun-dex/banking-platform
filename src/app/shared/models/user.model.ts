export interface LoginRequest {
    username : string;
    password ?: string;
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


