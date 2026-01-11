// libraries
import { Schema } from "mongoose";

// schemas
import { vendorPaymentBankSchema } from "@/db/mongoose/schema/nestedDocuments/vendorPaymentBank";

// types
import { VendorPaymentDocument } from "@/common/types/documentation/nestedDocuments/vendorPayment";

// schema
export const vendorPaymentSchema = new Schema<VendorPaymentDocument>(
  {
    gstNumber: {
      type: String,
      required: false
    },
    bank: {
      type: vendorPaymentBankSchema,
      required: true
    },
    upi: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);
