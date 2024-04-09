import { Document, Types, model, Schema } from "mongoose";

const ExpensesSchema = new Schema({
    amount: {
        type: Number,
        required: [true, "Please enter a valid number"],
    },
    property: {
        type: Types.ObjectId,
        ref: "Property",
        required: [true, "Property is required"],
    },
    narration: {
        type: String,
        required: [true, "Narration is required"],
        maxlength: [300, "narration cannot exceed 300 characters"],
        minlength: [3, "narration must be more than 3 characters"],
    },
},
{ timestamps: true }
);
  
ExpensesSchema.methods.toJSON = function (): any {
    return {
      id: this._id,
      amount: this.amount,
      property: this.property,
      narration: this.narration
    };
};
  
export interface ExpensesDocument extends Document {
    amount: number;
    property: string;
    narration: string;
    toJSON: () => any;
}
  
export default model<ExpensesDocument>("Expenses", ExpensesSchema);
  