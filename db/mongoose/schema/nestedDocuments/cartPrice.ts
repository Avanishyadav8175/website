// libraries
import { Schema } from "mongoose";

// types
import { CartPriceDocument } from "@/common/types/documentation/nestedDocuments/cartPrice";

// schemas
export const cartPriceSchema = new Schema<CartPriceDocument>(
  {
    content: {
      type: Number,
      required: true
    },
    addon: {
      type: Number,
      required: false,
      default: 0
    },
    customization: {
      type: Number,
      required: false,
      default: 0
    },
    deliveryCharge: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    paymentPercentage: {
      type: Number,
      required: false,
      default: 100
    },
    couponDiscount: {
      type: Number,
      required: false,
      default: 0
    },
    payable: {
      type: Number,
      required: true
    },
    due: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);
