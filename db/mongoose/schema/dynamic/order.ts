// libraries
import { Schema } from "mongoose";

// schemas
import { orderPaymentSchema } from "@/db/mongoose/schema/nestedDocuments/orderPayment";

// types
import {
  OrderDocument,
  OrderModel
} from "@/common/types/documentation/dynamic/order";

// schema
export const orderSchema = new Schema<OrderDocument, OrderModel>(
  {
    id: {
      type: String,
      required: true
    },
    payment: {
      type: orderPaymentSchema,
      required: true
    },
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
      required: true
    },
    deliveries: [
      {
        type: Schema.Types.ObjectId,
        ref: "Delivery",
        required: false,
        default: []
      }
    ],
    createdBy: {
      type: String,
      required: false
    },
    updatedBy: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);

// search index
orderSchema.index({
  createdBy: "text",
  updatedBy: "text"
});
