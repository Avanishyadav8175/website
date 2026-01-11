// libraries
import { Schema } from "mongoose";

// schemas
import { contentRatingSchema } from "@/db/mongoose/schema/nestedDocuments/contentRating";
import { contentReviewSchema } from "@/db/mongoose/schema/nestedDocuments/contentReview";

// types
import { ContentQualityDocument } from "@/common/types/documentation/nestedDocuments/contentQuality";

// schemas
export const contentQualitySchema = new Schema<ContentQualityDocument>(
  {
    rating: {
      type: contentRatingSchema,
      required: false
    },
    review: {
      type: contentReviewSchema,
      required: false
    }
  },
  { timestamps: true }
);
