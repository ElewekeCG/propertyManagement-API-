export interface CreatePropParams {
    landlord: string;
    name: string;
    address: string;
    percentage: number;
}

export interface PropertyResult {
    id: string;
    landlord: string;
    name: string;
    address: string;
    percentage: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface GetAllProperties{
    resultPerPage?: number;
    page?: number;
}

export interface GetAllPropertiesResult{
    remainingCount: number;
    remainingPages: number;
    count: number;
    properties: PropertyResult[];
}