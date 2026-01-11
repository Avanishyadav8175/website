// libraries
import { Schema } from "mongoose";

// types
import { type ContentSuggestionDocument } from "@/common/types/documentation/nestedDocuments/contentSuggestion";

// schemas
export const contentSuggestionSchema = new Schema<ContentSuggestionDocument>(
  {
    aiTag: [
      {
        type: Schema.Types.ObjectId,
        ref: "Content",
        required: false
      }
    ],
    relatedAITag: [
      {
        type: Schema.Types.ObjectId,
        ref: "Content",
        required: false
      }
    ],
    category: [
      {
        type: Schema.Types.ObjectId,
        ref: "Content",
        required: false
      }
    ]
  },
  { timestamps: true }
);
