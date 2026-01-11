// libraries
import { Schema } from "mongoose";

// types
import { type ContentTagDocument } from "@/common/types/documentation/nestedDocuments/contentTag";

// schemas
export const contentTagSchema = new Schema<ContentTagDocument>(
  {
    aiTags: [
      {
        type: Schema.Types.ObjectId,
        ref: "AITag",
        required: true
      }
    ],
    relatedAITags: [
      {
        type: Schema.Types.ObjectId,
        ref: "AITag",
        required: false
      }
    ],
    promotionTag: {
      type: Schema.Types.ObjectId,
      ref: "PromotionTag",
      required: false
    },
    searchTags: [
      {
        type: Schema.Types.ObjectId,
        ref: "SearchTag",
        required: true
      }
    ]
  },
  { timestamps: true }
);
