
export interface CreateTransactionDto {
    fromAccountId: string;
    toAccountId: string;
    amount: number;
    description?: string;

}

export interface TransactionResponse {
    transactionId: string;
    status: 'PENDING' | 'COMPLETED' | 'FAILED';
    message?: string;
    timestamp: string;
}
