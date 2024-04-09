import Expenses from "../db/models/expenses";
import Property from "../db/models/property";

import {
    UnauthorizedError,
} from "../errors";

import {
    CreateExpenseParams, 
    CreatedExpenseResult
} from "./models/expense-model";

export default class Expense {
    public async createExpense (
        params: CreateExpenseParams
    ): Promise<CreatedExpenseResult> {
        const result = await Expenses.create({
            amount: params.amount,
            property: params.property,
            narration: params.narration
        });

        if(!result) {
            throw new UnauthorizedError();
        }
        return result.toJSON() as CreatedExpenseResult;
    }

    public async viewExpenses(property: string): Promise<CreatedExpenseResult> {
        const propQuery = await Property.findOne({name: property});
        if(!propQuery){
            throw new Error("Property not found");
        }
        const result = await Expenses.find({property: propQuery._id});
        if(!result){
            throw new UnauthorizedError();
        }
        return result as unknown as CreatedExpenseResult;
    }
}