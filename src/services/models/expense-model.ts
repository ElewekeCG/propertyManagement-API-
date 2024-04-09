export interface CreateExpenseParams {
    amount: number;
    property: string;
    narration: string;
}

export interface CreatedExpenseResult {
    amount: number;
    property: string;
    narration: string;
    createdAt: Date;
    updatedAt: Date;
}