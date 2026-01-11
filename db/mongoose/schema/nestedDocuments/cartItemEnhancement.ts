// libraries
import { Schema } from "mongoose";

// schemas
import { cartItemEnhancementItemSchema } from "@/db/mongoose/schema/nestedDocuments/cartItemEnhancementItem";

// types
import { CartItemEnhancementDocument } from "@/common/types/documentation/nestedDocuments/cartItemEnhancement";

// schema
export const cartItemEnhancementSchema =
  new Schema<CartItemEnhancementDocument>(
    {
      label: {
        type: String,
        required: true
      },
      items: [
        {
          type: cartItemEnhancementItemSchema,
          required: true
        }
      ]
    },
    { timestamps: true }
  );
