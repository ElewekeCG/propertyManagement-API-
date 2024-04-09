import { Document, Types, model, Schema } from "mongoose";

const PropertySchema = new Schema({
    landlord: {
        type: Types.ObjectId,
        ref: "Landlords",
        required: [true, "Please enter a value"],
    }, 
    name: {
        type: String,
        required: [true, "name is required"],
        maxlength: [30, "Maximum characters is 30"],
        minlength: [3, "minimum length is 3"]
    },
    address: {
        type: String,
        required: [true, "Please enter address"],
        maxlength: [300, "Address cannot exceed 300 characters"],
        minlength: [6, "Address should be at least 6 characters long"],
    },
},
{ timestamps: true }
);
  
  PropertySchema.methods.toJSON = function (): any {
    return {
      id: this._id,
      landlord: this.landlord,
      name: this.name,
      address: this.address,
    };
  };
  
  export interface PropertyDocument extends Document {
    landlord: Types.ObjectId;
    name: string;
    address: string;
    toJSON: () => any;
  }
  
  export default model<PropertyDocument>("Property", PropertySchema);
  