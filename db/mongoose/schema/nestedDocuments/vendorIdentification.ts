// libraries
import { Schema } from "mongoose";

// types
import { VendorIdentificationDocument } from "@/common/types/documentation/nestedDocuments/vendorIdentification";

// schema
export const vendorIdentificationSchema =
  new Schema<VendorIdentificationDocument>(
    {
      photo: {
        type: Schema.Types.ObjectId,
        ref: "IdentificationImage",
        required: true
      },
      aadhar: {
        type: Schema.Types.ObjectId,
        ref: "IdentificationImage",
        required: true
      },
      pan: {
        type: Schema.Types.ObjectId,
        ref: "IdentificationImage",
        required: true
      }
    },
    { timestamps: true }
  );
