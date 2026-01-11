// libraries
import { Schema } from "mongoose";

// types
import { CartItemEnhancementItemDocument } from "@/common/types/documentation/nestedDocuments/cartItemEnhancementItem";

// schemas
export const cartItemEnhancementItemSchema =
  new Schema<CartItemEnhancementItemDocument>(
    {
      enhancement: {
        type: Schema.Types.ObjectId,
        ref: "Enhancement",
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    },
    { timestamps: true }
  );
