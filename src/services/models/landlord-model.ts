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