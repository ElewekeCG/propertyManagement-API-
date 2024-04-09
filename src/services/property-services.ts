import Property from "../db/models/property";
import Landlord from "../db/models/landlords";

import {
    UnauthorizedError,
    NotFoundError,
} from "../errors";

import {
    CreatePropParams,
    PropertyResult,
    CreateLandlordParams,
    LandlordResult 
} from "./models/property-models";

export default class PropertyService {
    public async createProp(
        params: CreatePropParams
    ): Promise<PropertyResult> {
        const landlordData = await Landlord.findOne({name: params.landlord});
        if(!landlordData){
            throw new NotFoundError("Landlord not found");
        }
        const res = await Property.create({
            landlord: landlordData._id,
            name: params.name,
            address: params.address,
        });
        if (!res){
            throw new UnauthorizedError();
        }
        return res.toJSON() as PropertyResult;
    }

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