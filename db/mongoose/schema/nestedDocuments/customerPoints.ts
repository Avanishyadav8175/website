// libraries
import { Schema } from "mongoose";

// schemas
import { customerPointTransactionSchema } from "@/db/mongoose/schema/nestedDocuments/customerPointTransaction";

// types
import { type CustomerPointsDocument } from "@/common/types/documentation/nestedDocuments/customerPoints";

// schemas
export const customerPointsSchema = new Schema<CustomerPointsDocument>(
  {
    credit: {
      type: Number,
      required: true
    },
    debit: {
      type: Number,
      required: true
    },
    available: {
      type: Number,
      required: true
    },
    expired: {
      type: Number,
      required: true
    },
    transactions: [
      {
        type: customerPointTransactionSchema,
        required: false,
        default: []
      }
    ]
  },
  { timestamps: true }
);
