export interface CreateTenantParams {
    name: string;
    propertyName: string;
    phone: string;
    accommodationType: string;
    payRate: number;
}

export interface TenantResult {
    id: string;
    name: string;
    propertyName: string;
    phone: string;
    accommodationType: string;
    payRate: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface TenantSearchParams {
    propertyName: string;
}