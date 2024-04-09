import { StatusCodes } from "http-status-codes";

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
    CreateTransactionParams,
    TransactionResult,
} from "../services/models/transaction-Model";
import TransactionService from "../services/transaction-service";

@Route("/api/v1/transactions")
@Tags("Transactions")
export class TransactionController extends Controller {
    @Post("/add")
    @OperationId("addTransaction")
    @Security("jwt")
    @Response(StatusCodes.CREATED)
    @Response(StatusCodes.BAD_REQUEST, "Failed to create transaction")
    public async addTransaction (
        @Body() body: CreateTransactionParams
    ): Promise <TransactionResult> {
        return new TransactionService().createTransaction(body);
    }

    @Post("/get")
    @OperationId("getTransaction")
    @Security("jwt")
    @Response(StatusCodes.OK)
    @Response(StatusCodes.UNAUTHORIZED, "Unauthorized")
    public async getTransaction (
        @Body()property: string
    ): Promise <TransactionResult> {
        return new TransactionService().getTransactions(property);
    }
}