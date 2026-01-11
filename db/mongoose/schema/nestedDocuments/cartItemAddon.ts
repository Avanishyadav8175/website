// libraries
import { Schema } from "mongoose";

// types
import { CartItemAddonDocument } from "@/common/types/documentation/nestedDocuments/cartItemAddon";

// schemas
export const cartItemAddonSchema = new Schema<CartItemAddonDocument>(
  {
    addon: {
      type: Schema.Types.ObjectId,
      ref: "Addon",
      required: true
    },
    pricePerUnit: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    customizationOption: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);
