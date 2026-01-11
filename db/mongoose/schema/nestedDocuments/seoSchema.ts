// libraries
import { Schema } from "mongoose";

// types
import { SEOSchemaDocument } from "@/common/types/documentation/nestedDocuments/seoSchema";

// schemas
export const seoSchemaSchema = new Schema<SEOSchemaDocument>(
  {
    name: {
      type: String,
      required: true
    },
    totalRatingCount: {
      type: Number,
      required: true
    },
    maxRatingValue: {
      type: Number,
      required: true
    },
    ratingValue: {
      type: Number,
      required: true
    },
    maxPrice: {
      type: Number,
      required: true
    },
    minPrice: {
      type: Number,
      required: true
    },
    totalItems: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);
