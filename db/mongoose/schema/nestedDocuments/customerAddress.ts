// libraries
import { Schema } from "mongoose";

// types
import { type CustomerAddressDocument } from "@/common/types/documentation/nestedDocuments/customerAddress";

// schemas
export const customerAddressSchema = new Schema<CustomerAddressDocument>(
  {
    address: {
      type: String,
      required: true
    },
    landmark: {
      type: String,
      required: false
    },
    city: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    isDefault: {
      type: Boolean,
      required: true
    }
  },
  { timestamps: true }
);
