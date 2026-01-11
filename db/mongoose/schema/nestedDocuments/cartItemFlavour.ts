// libraries
import { Schema } from "mongoose";

// types
import { CartItemFlavourDocument } from "@/common/types/documentation/nestedDocuments/cartItemFlavour";

// schemas
export const cartItemFlavourSchema = new Schema<CartItemFlavourDocument>(
  {
    label: {
      type: String,
      required: true
    },
    flavour: {
      type: Schema.Types.ObjectId,
      ref: "Flavour",
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);
