import { StatusCodes } from "http-status-codes";
import PropertyService from "../services/property-services";

import {
    Body, 
    Controller,
    Get,
    OperationId,
    Path,
    Post, 
    // Query,
    Response,
    Route,
    Security,
    Tags,
} from "tsoa";

import {
    CreatePropParams,
    GetAllProperties,
    GetAllPropertiesResult,
    PropertyResult,
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
    ): Promise <{landlordName: string, propertyResult: PropertyResult}> {
        return new PropertyService().createProp(body);
    }

    @Get("/search/{name}")
    @OperationId("searchProperty")
    @Security("jwt")
    @Response(StatusCodes.OK)
    @Response(StatusCodes.NOT_FOUND, "Property not found")
    public async searchProperty(
        @Path() name: string
    ): Promise<{landlordName: string, propertyResult: PropertyResult}> {
        try{
            return new PropertyService().searchProp(name);
        } catch (error) {
            console.error(error);
            throw error;
        } 
    }

    @Post("/properties")
    @OperationId("getAllProperties")
    @Security("jwt")
    @Response(StatusCodes.OK)
    @Response(StatusCodes.NOT_FOUND, "No properties found")
    public async viewProperties(
        @Body() body: GetAllProperties
    ): Promise<GetAllPropertiesResult>{
        return new PropertyService().viewAllProperties(body);
    }
} 