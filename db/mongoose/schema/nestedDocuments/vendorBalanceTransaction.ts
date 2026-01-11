// libraries
import { Schema } from "mongoose";

// schemas
import { deliveryPaymentSchema } from "@/db/mongoose/schema/nestedDocuments/deliveryPayment";

// types
import { VendorBalanceTransactionDocument } from "@/common/types/documentation/nestedDocuments/vendorBalanceTransaction";

// schema
export const vendorBalanceTransactionSchema =
  new Schema<VendorBalanceTransactionDocument>(
    {
      status: {
        type: String,
        enum: ["pending", "paid", "canceled"],
        required: false,
        default: "pending"
      },
      delivery: {
        type: Schema.Types.ObjectId,
        ref: "Delivery",
        required: true
      },
      amount: {
        type: deliveryPaymentSchema,
        required: true
      },
      deliveredOn: {
        type: Date,
        required: false
      }
    },
    { timestamps: true }
  );
