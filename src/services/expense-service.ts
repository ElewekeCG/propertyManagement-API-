import Expenses from "../db/models/expenses";
import Property from "../db/models/property";

import {
    UnauthorizedError,
    NotFoundError,
} from "../errors";

import {
    CreateExpenseParams, 
    CreatedExpenseResult
} from "./models/expense-model";

export default class Expense {
    public async getPropId(property: string){
        const findProp = await Property.findOne({name:property });
        if(!findProp){
            throw new NotFoundError("Property not found");
        } 
        return findProp._id;
    }
    public async createExpense (
        params: CreateExpenseParams
    ): Promise<CreatedExpenseResult> {
        const prop = await this.getPropId(params.property);
        
        const result = await Expenses.create({
            amount: params.amount,
            property: prop,
            narration: params.narration
        });

        if(!result) {
            throw new UnauthorizedError();
        }
        return result.toJSON() as CreatedExpenseResult;
    }

    public async viewExpenses(property: string): Promise<CreatedExpenseResult> {
        const prop = await this.getPropId(property);
        const result = await Expenses.find({property: prop}).populate('property');
        if(!result){
            throw new UnauthorizedError();
        }
        return result as unknown as CreatedExpenseResult;
    }
}