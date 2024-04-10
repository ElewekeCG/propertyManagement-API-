import Landlord from "../db/models/landlords";

import {
    UnauthorizedError,
    // NotFoundError,
} from "../errors";

import {
    CreateLandlordParams,
    LandlordResult,
} from "./models/landlord-model";


export default class LandlordService{
    public async createLandlord(
        params: CreateLandlordParams
    ): Promise<LandlordResult> {
        const res = await Landlord.create({
            name: params.name,
            numberOfProperties: params.numberOfProperties,
        });
        if (!res){
            throw new UnauthorizedError();
        }
        return res.toJSON() as LandlordResult;
    }
}