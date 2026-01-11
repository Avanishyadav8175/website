// libraries
import { Schema } from "mongoose";

// types
import { RatingDocument } from "@/common/types/documentation/nestedDocuments/rating";

// schemas
export const ratingSchema = new Schema<RatingDocument>(
  {
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
