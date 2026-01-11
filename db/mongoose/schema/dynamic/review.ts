// libraries
import { Schema } from "mongoose";

// types
import {
  ReviewDocument,
  ReviewModel
} from "@/common/types/documentation/dynamic/review";

// schema
export const reviewSchema = new Schema<ReviewDocument, ReviewModel>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true
    },
    content: {
      type: Schema.Types.ObjectId,
      ref: "Content",
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    review: {
      type: String,
      required: false
    },
    images: [
      {
        type: Schema.Types.ObjectId,
        ref: "ReviewImage",
        required: false
      }
    ],
    isActive: {
      type: Boolean,
      required: false,
      default: false
    },
    isDeleted: {
      type: Boolean,
      required: false,
      default: false
    },
    createdBy: {
      type: String,
      required: false
    },
    updatedBy: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);

// search index
reviewSchema.index({
  createdBy: "text",
  updatedBy: "text"
});
