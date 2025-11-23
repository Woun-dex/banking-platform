export interface CreateAccountDto {
    userId: string;
    currency: string;
    initialBalance: number;
}

export interface AccountResponse {
    accountId: string;
    userId: string;
    balance: number;
    currency: string;
}