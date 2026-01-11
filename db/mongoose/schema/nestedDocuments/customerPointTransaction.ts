// libraries
import { Schema } from "mongoose";

// types
import { type CustomerPointTransactionDocument } from "@/common/types/documentation/nestedDocuments/customerPointTransaction";

// schemas
export const customerPointTransactionSchema =
  new Schema<CustomerPointTransactionDocument>(
    {
      type: {
        type: String,
        enum: ["credit", "debit"],
        required: true
      },
      order: {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: true
      },
      amount: {
        type: Number,
        required: true
      },
      isExpired: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    { timestamps: true }
  );
