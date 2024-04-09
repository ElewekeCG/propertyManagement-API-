import { StatusCodes } from "http-status-codes";
import PropertyService from "../services/property-services";

import {
    Body, 
    Controller,
    OperationId,
    Post, 
    Response,
    Route,
    Security,
    Tags,
} from "tsoa";

import {
    CreatePropParams,
    PropertyResult,
    CreateLandlordParams,
    LandlordResult
} from "../services/models/property-models";

@Route("/api/v1/property")
@Tags("Properties")
export class PropertyController extends Controller {
    @Post("/add")
    @OperationId("createProperty")
    @Security("jwt")
    @Response(StatusCodes.CREATED)
    @Response(StatusCodes.BAD_REQUEST, "Failed to create post")
    public async createProperty(
        @Body() body: CreatePropParams
    ): Promise <PropertyResult> {
        return new PropertyService().createProp(body);
    }

    @Post("/landlord")
    @OperationId("createLandlord")
    @Security("jwt")
    @Response(StatusCodes.CREATED)
    @Response(StatusCodes.BAD_REQUEST, "Failed to create post")
    public async createLandlord(
        @Body() body: CreateLandlordParams
    ): Promise <LandlordResult> {
        return new PropertyService().createLandlord(body);
    }
} 