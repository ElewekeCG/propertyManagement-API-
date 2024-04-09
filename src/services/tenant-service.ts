import Tenant from "../db/models/tenants";
import Property from "../db/models/property";
import {
    NotFoundError,
    UnauthorizedError,
} from "../errors";

import {
    CreateTenantParams,
    TenantResult,
    TenantSearchParams
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

    public async findTenants (
        params: TenantSearchParams
    ): Promise<TenantResult> {
        const property = await Property.findOne({name: params.propertyName});
        if(!property){
            throw new Error("Property not found");
        }
        const res = await Tenant.find({propertyName: property._id});
        if(!res){
            throw new NotFoundError();
        }
        return res as unknown as TenantResult;
    }

    public async getTenants (): Promise<TenantResult> {
        const results = await Tenant.find();
        if(!results){
            throw new NotFoundError();
        }
        return results as unknown as TenantResult;
    }
}