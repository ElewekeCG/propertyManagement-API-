import { Document, Types, model, Schema } from "mongoose";

const TransactionSchema = new Schema({
    amount: {
        type: Number,
        required: [true, "Please enter a valid number"],
    },
    name: {
        type: Types.ObjectId,
        ref: "tenants",
        required: [true, "Please enter tenant's name"]
    },
    property: {
        type: Types.ObjectId,
        ref: "Property",
        required: [true, "Property is required"],
    },
    startDate: {
        type: Date,
        required: [true, "enter a start date"]
    },
    endDate: {
        type: Date,
        required: [true, "enter end date"]
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
  
TransactionSchema.methods.toJSON = function (): any {
    return {
      id: this._id,
      amount: this.amount,
      name: this.name,
      property: this.property,
      startDate: this.startDate,
      endDate: this.endDate,
      narration: this.narration
    };
};
  
export interface TransactionDocument extends Document {
    amount: number;
    name: string;
    property: string;
    startDate: Date;
    endDate: Date;
    narration: string;
    toJSON: () => any;
}
  
export default model<TransactionDocument>("Transaction", TransactionSchema);
  