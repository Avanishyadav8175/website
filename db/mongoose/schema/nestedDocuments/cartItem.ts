// libraries
import { Schema } from "mongoose";

// schemas
import { cartItemAddonSchema } from "@/db/mongoose/schema/nestedDocuments/cartItemAddon";
import { cartItemCustomizationSchema } from "@/db/mongoose/schema/nestedDocuments/cartItemCustomization";
import { cartItemDeliverySchema } from "@/db/mongoose/schema/nestedDocuments/cartItemDelivery";

// types
import { CartItemDocument } from "@/common/types/documentation/nestedDocuments/cartItem";

// schemas
export const cartItemSchema = new Schema<CartItemDocument>(
  {
    status: {
      type: String,
      enum: [],
      required: false,
      default: "new"
    },
    content: {
      type: Schema.Types.ObjectId,
      ref: "Content",
      required: true
    },
    customVariant: {
      type: Schema.Types.ObjectId,
      required: false
    },
    titleIfCustomVariant: {
      type: String,
      required: false
    },
    pricePerUnit: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    delivery: {
      type: cartItemDeliverySchema,
      required: false
    },
    instruction: {
      type: String,
      required: false
    },
    addons: [
      {
        type: cartItemAddonSchema,
        required: false
      }
    ],
    customization: {
      type: cartItemCustomizationSchema,
      required: false
    }
  },
  { timestamps: true }
);
