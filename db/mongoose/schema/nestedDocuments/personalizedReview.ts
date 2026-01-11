// libraries
import { Schema } from "mongoose";

// types
import { type PersonalizedReviewDocument } from "@/common/types/documentation/nestedDocuments/personalizedReview";

// schemas
export const personalizedReviewSchema = new Schema<PersonalizedReviewDocument>(
  {
    area: {
      type: String,
      required: false
    },
    review: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);
