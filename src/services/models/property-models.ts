export interface CreatePropParams {
    landlord: string;
    name: string;
    address: string;
}

export interface PropertyResult {
    id: string;
    landlord: string;
    name: string;
    address: string;
    landlordName: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateLandlordParams {
    name: string;
    numberOfProperties: number;
}

export interface LandlordResult {
    id: string;
    name: string;
    numberOfProperties: number;
    createdAt: Date;
    updatedAt: Date;
}