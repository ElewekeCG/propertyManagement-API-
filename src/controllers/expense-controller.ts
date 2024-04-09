import { StatusCodes } from "http-status-codes";
import ExpenseService from "../services/expense-service";

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
    CreateExpenseParams,
    CreatedExpenseResult
} from "../services/models/expense-model";

@Route("/api/v1/expenses")
@Tags("Expenses")
export class ExpenseController extends Controller {
    @Post("/add")
    @OperationId("addExpense")
    @Security("jwt")
    @Response(StatusCodes.CREATED)
    @Response(StatusCodes.BAD_REQUEST, "Failed to add expense")
    public async addExpense(
        @Body() body: CreateExpenseParams
    ): Promise <CreatedExpenseResult> {
        return new ExpenseService().createExpense(body);
    }

    @Post("/view")
    @OperationId("viewExpense")
    @Security("jwt")
    @Response(StatusCodes.OK)
    @Response(StatusCodes.UNAUTHORIZED, "Unauthorized")
    public async viewExpenses(
        @Body()property:string
    ): Promise<CreatedExpenseResult> {
        return new ExpenseService().viewExpenses(property);
    }
}