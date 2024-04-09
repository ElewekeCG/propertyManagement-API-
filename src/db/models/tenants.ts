import{ Document, Types, model, Schema } from "mongoose";

const TenantSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        maxlength: [30, "Name cannot exceed 30 characters"],
        minlength: [3, "Name must be at least 3 characters"]
    },
    propertyName: {
        type: Types.ObjectId,
        ref: "Property",
        required: [true, "Please enter a value"]
    },
    phone: {
        type: String,
        maxlength: [11, "Number cannot exceed 11 characters"],
        minlength: [11, "Number cannot be less than 11 characters"]
    },
    accommodationType: {
        type: String,
        required: [true, "Please enter accommodation type"],
        maxlength: [30, "Value cannot exceed 30 characters"],
        minlegth: [3, "Value must be at least 3 characters"]
    },
    payRate: {
        type: Number,
        required: [true, "Please enter a rate"],
    },
},
{ timestamps: true }
);

TenantSchema.methods.toJSON = function (): any {
    return {
        id: this._id,
        name: this.name,
        propertyName: this.propertyName,
        phone: this.phone,
        accommodationType: this.accommodationType,
        payRate: this.payRate
    };
};

export interface TenantDocument extends Document {
    name: string;
    propertyName: string;
    phone: string;
    accommodationType: string;
    payRate: number;
    toJSON: () => any;
}

export default model<TenantDocument>("Tenant", TenantSchema);