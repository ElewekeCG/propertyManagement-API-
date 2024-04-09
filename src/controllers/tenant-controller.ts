import { StatusCodes } from "http-status-codes";
import TenantService from "../services/tenant-service";

import {
    Body, 
    Controller,
    Get,
    OperationId,
    Post, 
    Response,
    Route,
    Security,
    Tags,
} from "tsoa";

import {
    CreateTenantParams,
    TenantResult,
    TenantSearchParams
} from "../services/models/tenant-models";

@Route("/api/v1/tenants")
@Tags("Tenants")
export class TenantController extends Controller {
    @Post("/add")
    @OperationId("addTenant")
    @Security("jwt")
    @Response(StatusCodes.CREATED)
    @Response(StatusCodes.BAD_REQUEST, "Failed to create tenant")
    public async addTenant(
        @Body() body: CreateTenantParams
    ): Promise <TenantResult> {
        return new TenantService().createTenant(body);
    }

    @Post("/find")
    @OperationId("findTenants")
    @Security("jwt")
    @Response(StatusCodes.OK)
    @Response(StatusCodes.BAD_REQUEST, "Failed to find tenants")
    public async findTenants(
        @Body() body: TenantSearchParams
    ): Promise <TenantResult> {
        return new TenantService().findTenants(body);
    }

    @Get("/get")
    @OperationId("getTenants")
    @Security("jwt")
    @Response(StatusCodes.OK)
    @Response(StatusCodes.BAD_REQUEST, "Failed to find tenants")
    public async getTenants(): Promise <TenantResult> {
        return new TenantService().getTenants();
    }

} 