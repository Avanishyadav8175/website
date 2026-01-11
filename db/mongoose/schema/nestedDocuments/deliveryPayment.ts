// libraries
import { Schema } from "mongoose";

// types
import { DeliveryPaymentDocument } from "@/common/types/documentation/nestedDocuments/deliveryPayment";

// schemas
export const deliveryPaymentSchema = new Schema<DeliveryPaymentDocument>(
  {
    total: {
      type: Number,
      required: true
    },
    toBeCollected: {
      type: Number,
      required: true
    },
    pending: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);
