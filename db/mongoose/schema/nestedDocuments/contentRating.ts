// libraries
import { Schema } from "mongoose";

// types
import { ContentRatingDocument } from "@/common/types/documentation/nestedDocuments/contentRating";

// schemas
export const contentRatingSchema = new Schema<ContentRatingDocument>(
  {
    maxValue: {
      type: Number,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    count: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);
