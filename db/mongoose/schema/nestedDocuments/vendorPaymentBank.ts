// libraries
import { Schema } from "mongoose";

// types
import { VendorPaymentBankDocument } from "@/common/types/documentation/nestedDocuments/vendorPaymentBank";

// schema
export const vendorPaymentBankSchema = new Schema<VendorPaymentBankDocument>(
  {
    name: {
      type: String,
      required: true
    },
    branch: {
      type: String,
      required: true
    },
    ifsc: {
      type: String,
      required: true
    },
    accountType: {
      type: String,
      enum: ["current", "savings"],
      required: true
    },
    accountNumber: {
      type: String,
      required: true
    },
    accountHolderName: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);
