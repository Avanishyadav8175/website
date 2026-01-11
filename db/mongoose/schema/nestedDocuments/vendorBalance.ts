// libraries
import { Schema } from "mongoose";

// schemas
import { vendorBalanceTransactionSchema } from "@/db/mongoose/schema/nestedDocuments/vendorBalanceTransaction";
import { vendorBalanceUnsettledSchema } from "@/db/mongoose/schema/nestedDocuments/vendorBalanceUnsettled";

// types
import { VendorBalanceDocument } from "@/common/types/documentation/nestedDocuments/vendorBalance";

// schema
export const vendorBalanceSchema = new Schema<VendorBalanceDocument>(
  {
    settled: {
      type: Number,
      required: false,
      default: 0
    },
    unsettled: {
      type: vendorBalanceUnsettledSchema,
      required: true
    },
    transactions: [
      {
        type: vendorBalanceTransactionSchema,
        required: true
      }
    ]
  },
  { timestamps: true }
);
