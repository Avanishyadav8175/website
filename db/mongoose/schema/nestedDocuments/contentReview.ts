// libraries
import { Schema } from "mongoose";

// types
import { ContentReviewDocument } from "@/common/types/documentation/nestedDocuments/contentReview";

// schemas
export const contentReviewSchema = new Schema<ContentReviewDocument>(
  {
    personalized: [
      {
        type: String,
        required: false
      }
    ],
    group: {
      type: Schema.Types.ObjectId,
      ref: "ReviewGroup",
      required: true
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
        required: true
      }
    ],
    count: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);
