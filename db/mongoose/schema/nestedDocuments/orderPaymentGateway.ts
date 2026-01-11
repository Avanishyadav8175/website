// libraries
import { Schema } from "mongoose";

// types
import { OrderPaymentGatewayDocument } from "@/common/types/documentation/nestedDocuments/orderPaymentGateway";

// schemas
export const orderPaymentGatewaySchema =
  new Schema<OrderPaymentGatewayDocument>(
    {
      name: {
        type: String,
        required: true,
        enum: ["offline", "razorpay", "payu"]
      },
      info: {
        type: Schema.Types.Mixed,
        required: false
      }
    },
    { timestamps: true }
  );
