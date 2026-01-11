// libraries
import { Schema } from "mongoose";

// types
import { CartItemUpgradeDocument } from "@/common/types/documentation/nestedDocuments/cartItemUpgrade";

// schemas
export const cartItemUpgradeSchema = new Schema<CartItemUpgradeDocument>(
  {
    label: {
      type: String,
      required: true
    },
    upgrade: {
      type: Schema.Types.ObjectId,
      ref: "Upgrade",
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);
