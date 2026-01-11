// libraries
import { Schema } from "mongoose";

// types
import { ContentEnhancementItemDocument } from "@/common/types/documentation/nestedDocuments/contentEnhancementItem";

// schemas
export const contentEnhancementItemSchema =
  new Schema<ContentEnhancementItemDocument>(
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
