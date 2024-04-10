import Tenant from "../db/models/tenants";
import Property from "../db/models/property";
import {
    InvalidInputError,
    NotFoundError,
    UnauthorizedError,
} from "../errors";

import {
    CreateTenantParams,
    TenantResult,
    TenantSearchParam
} from "./models/tenant-models";

export default class TenantService {
    public async createTenant(
        params: CreateTenantParams
    ): Promise<TenantResult> {
        const property = await Property.findOne({name: params.propertyName});
        if(!property){
            throw new Error("Property not found");
        }
        const result = await Tenant.create({
            name: params.name,
            propertyName: property._id,
            phone: params.phone,
            accommodationType: params.accommodationType,
            payRate: params.payRate,
        });
        if(!result){
            throw new UnauthorizedError();
        }
        return result.toJSON() as TenantResult;
    }

    public async findTenantsByProp (
        params: TenantSearchParam
    ): Promise<TenantResult> {
        let searchRes;
        let value = params.searchValue;
        switch(params.searchType) {
            case 'property': {
                const propRes = await Property.findOne({name: value});
                if(!propRes) {
                    throw new NotFoundError("Property not found");
                }
                searchRes = await Tenant.find({propertyName: propRes._id});
                if(!searchRes || searchRes.length == 0){
                    throw new NotFoundError("Tenant not found");
                }
                break;
            }

            case 'tenant': {
                searchRes = await Tenant.findOne({name: value});
                if(!searchRes){
                    throw new NotFoundError("Tenant not found");
                }
                break;  
            }
            default: 
                throw new InvalidInputError("Invalid input");
        }
        return searchRes as unknown as TenantResult;    
    }
}