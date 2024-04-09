import Transaction from "../db/models/transaction";
import Property from "../db/models/property";
import {
    UnauthorizedError,
} from "../errors";

import {
    CreateTransactionParams,
    TransactionResult
} from "./models/transaction-Model";

export default class TransactionService {
    public async createTransaction(
        params: CreateTransactionParams
    ): Promise<TransactionResult>{
        const result = await Transaction.create({
            amount: params.amount,
            name: params.name,
            property: params.property,
            startDate: params.startDate,
            endDate: params.endDate,
            narration: params.narration
        });
        if(!result){
            throw new UnauthorizedError();
        }
        return result.toJSON() as TransactionResult;
    }

    public async getTransactions(property: string): Promise<TransactionResult> {
        const prop = await Property.findOne({name: property});
        if(!prop){
            throw new Error("Property not found");
        }
        const res = await Transaction.find({property: prop._id});
        if(!res){
            throw new UnauthorizedError();
        }
        return res as unknown as TransactionResult;

    }
}