// libraries
import { Schema } from "mongoose";

// schemas
import { contentEnhancementItemSchema } from "@/db/mongoose/schema/nestedDocuments/contentEnhancementItem";

// types
import { ContentEnhancementDocument } from "@/common/types/documentation/nestedDocuments/contentEnhancement";

// schemas
export const contentEnhancementSchema = new Schema<ContentEnhancementDocument>(
  {
    label: {
      type: Schema.Types.ObjectId,
      ref: "Label",
      required: true
    },
    items: [
      {
        type: contentEnhancementItemSchema,
        required: true
      }
    ]
  },
  { timestamps: true }
);
