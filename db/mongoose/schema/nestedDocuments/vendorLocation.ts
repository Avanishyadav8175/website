// libraries
import { Schema } from "mongoose";

// types
import { VendorLocationDocument } from "@/common/types/documentation/nestedDocuments/vendorLocation";

// schema
export const vendorLocationSchema = new Schema<VendorLocationDocument>(
  {
    address: {
      type: String,
      required: true
    },
    state: {
      type: Schema.Types.ObjectId,
      ref: "State",
      required: true
    },
    city: {
      type: Schema.Types.ObjectId,
      ref: "City",
      required: true
    }
  },
  { timestamps: true }
);
