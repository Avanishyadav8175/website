// libraries
import { Schema } from "mongoose";

// types
import {
  ReviewImageDocument,
  ReviewImageModel
} from "@/common/types/documentation/media/reviewImage";

// schema
export const reviewImageSchema = new Schema<
  ReviewImageDocument,
  ReviewImageModel
>(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    alt: {
      type: String,
      required: true
    },
    extension: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    size: {
      type: Number,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    inUse: {
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
      required: true
    },
    updatedBy: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

// search index
reviewImageSchema.index({
  createdBy: "text",
  updatedBy: "text"
});
