export interface CreateTransactionParams {
    amount: number;
    name: string;
    property: string;
    startDate: Date;
    endDate: Date;
    narration: string;
}

export interface TransactionResult {
    id: string;
    amount: number;
    name: string;
    property: string;
    startDate: Date;
    endDate: Date;
    narration: string;
    createdAt: Date;
    updatedAt: Date;
}