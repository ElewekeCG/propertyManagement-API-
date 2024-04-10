import { StatusCodes } from "http-status-codes";
import LandlordService from "../services/landlord-service";

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
    CreateLandlordParams,
    LandlordResult
} from "../services/models/landlord-model";

@Route("/api/v1/landlords")
@Tags("Landlords")
export class LandlordController extends Controller{
    @Post("/landlord")
    @OperationId("createLandlord")
    @Security("jwt")
    @Response(StatusCodes.CREATED)
    @Response(StatusCodes.BAD_REQUEST, "Failed to create post")
    public async createLandlord(
        @Body() body: CreateLandlordParams
    ): Promise <LandlordResult> {
        return new LandlordService().createLandlord(body);
    }
}
