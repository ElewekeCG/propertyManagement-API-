import Property from "../db/models/property";
import Landlord from "../db/models/landlords";

const { max } = Math;

import {
    UnauthorizedError,
    NotFoundError,
} from "../errors";

import {
    CreatePropParams,
    PropertyResult, 
    GetAllProperties,
    GetAllPropertiesResult,
} from "./models/property-models";

export default class PropertyService {
    public async createProp(
        params: CreatePropParams
    ): Promise<{landlordName: string, propertyResult: PropertyResult}> {
        const landlordData = await Landlord.findOne({name: params.landlord});
        if(!landlordData){
            throw new NotFoundError("Landlord not found");
        }
        const res = await Property.create({
            landlord: landlordData._id,
            name: params.name,
            address: params.address,
            percentage: params.percentage,
        });
        if (!res){
            throw new UnauthorizedError("failed to create property");
        }
        
        return{
            landlordName: landlordData.name,
            propertyResult: res.toJSON() as PropertyResult
        }; 
    }

    public async searchProp(
        name: string
    ): Promise<{landlordName: string, propertyResult: PropertyResult}> {
        try {
            const searchResult = await Property.findOne({name});
            if (searchResult){
                const landlord = await Landlord.findById({_id: searchResult.landlord });
                if (!landlord){
                    throw new NotFoundError("Landlord not found");
                }
                return {
                    landlordName: landlord.name,
                    propertyResult: searchResult.toJSON() as PropertyResult
                };
            } 
            throw new NotFoundError("Property not found");
        } catch (error){
            console.error(error);
            throw error;
        }
    }

    public async viewAllProperties(
        params: GetAllProperties
    ): Promise<GetAllPropertiesResult>{
        const resultPerPage = params.resultPerPage ?? 10;
        const page = params.page ?? 0;

        const skip = resultPerPage * page;

        const properties = await Property.find({}, null, {
            skip: skip,
            limit: resultPerPage,
            sort: { createdAt: -1 },
        });

        if (properties.length > 0){
            const totalProperties = await Property.countDocuments();
            const remainingCount = max(totalProperties - (page + 1) * resultPerPage, 0);
            const remainingPages = Math.ceil(remainingCount / resultPerPage);

            return {
                remainingCount: remainingCount,
                remainingPages: remainingPages,
                count: properties.length,
                properties: properties.map(Property => Property.toJSON()),
            };
        }
        throw new NotFoundError("No properties found");  
    }
}