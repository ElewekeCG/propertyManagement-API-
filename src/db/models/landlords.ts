import { Document, model, Schema } from "mongoose";

const LandlordSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter a valid name"],
        maxlength: [30, "Name cannot exceed 30 characters"],
        minlength: [3, "Name cannot be less than 3 characters"],
    },
    numberOfProperties: {
        type: Number,
        required: [true, "Number of Properties is required"],
    },
},
{ timestamps: true }
);
  
LandlordSchema.methods.toJSON = function (): any {
    return {
      id: this._id,
      name: this.name,
      numberOfProperties: this.numberOfProperties
    };
};
  
export interface LandlordDocument extends Document {
    name: string;
    numberOfProperties: number;
    toJSON: () => any;
}
  
export default model<LandlordDocument>("Landlord", LandlordSchema);
  