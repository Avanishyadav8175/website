// libraries
import { Schema } from "mongoose";

// schemas
import { orderPaymentGatewaySchema } from "@/db/mongoose/schema/nestedDocuments/orderPaymentGateway";

// types
import { OrderPaymentDocument } from "@/common/types/documentation/nestedDocuments/orderPayment";

// schemas
export const orderPaymentSchema = new Schema<OrderPaymentDocument>(
  {
    status: {
      type: String,
      required: true,
      enum: ["pending", "completed"]
    },
    percentage: {
      type: Number,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    gateway: {
      type: orderPaymentGatewaySchema,
      required: true
    }
  },
  { timestamps: true }
);
