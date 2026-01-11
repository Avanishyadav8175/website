// libraries
import { Schema } from "mongoose";

// types
import { CartItemUploadedImageDocument } from "@/common/types/documentation/nestedDocuments/cartItemUploadedImage";

// schemas
export const cartItemUploadedImageSchema =
  new Schema<CartItemUploadedImageDocument>(
    {
      label: {
        type: String,
        required: true
      },
      images: [
        {
          type: Schema.Types.ObjectId,
          ref: "CustomizationImage",
          required: true
        }
      ]
    },
    { timestamps: true }
  );
