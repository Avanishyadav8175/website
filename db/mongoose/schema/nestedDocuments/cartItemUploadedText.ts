// libraries
import { Schema } from "mongoose";

// types
import { CartItemUploadedTextDocument } from "@/common/types/documentation/nestedDocuments/cartItemUploadedText";

// schemas
export const cartItemUploadedTextSchema =
  new Schema<CartItemUploadedTextDocument>(
    {
      label: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true
      }
    },
    { timestamps: true }
  );
