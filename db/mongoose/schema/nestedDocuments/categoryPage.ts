// libraries
import { Schema } from "mongoose";

// types
import { CategoryPageDocument } from "@/common/types/documentation/nestedDocuments/categoryPage";

// schemas
export const categoryPageSchema = new Schema<CategoryPageDocument>(
  {
    contentCount: {
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
    averageRating: {
      type: Number,
      required: true
    },
    ratingCount: {
      type: Number,
      required: true
    },
    defaultCityId: {
      type: String,
      required: false
    },
    contents: [
      {
        type: Schema.Types.ObjectId,
        ref: "Content",
        required: true
      }
    ]
  },
  { timestamps: true }
);
