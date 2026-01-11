// libraries
import { Schema } from "mongoose";

// types
import { CartItemDeliveryDocument } from "@/common/types/documentation/nestedDocuments/cartItemDelivery";

// schemas
export const cartItemDeliverySchema = new Schema<CartItemDeliveryDocument>(
  {
    date: {
      type: Date,
      required: true
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: "DeliveryType",
      required: false
    },
    slot: {
      type: Schema.Types.ObjectId,
      required: false
    }
  },
  { timestamps: true }
);
