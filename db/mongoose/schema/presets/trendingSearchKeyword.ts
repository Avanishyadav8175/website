// libraries
import { Schema } from "mongoose";

// types
import {
  type TrendingSearchKeywordDocument,
  type TrendingSearchKeywordModel
} from "@/common/types/documentation/presets/trendingSearchKeyword";

// schema
export const trendingSearchKeywordSchema = new Schema<
  TrendingSearchKeywordDocument,
  TrendingSearchKeywordModel
>(
  {
    label: {
      type: String,
      required: true,
      unique: true
    },
    path: {
      type: String,
      required: true
    },
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
trendingSearchKeywordSchema.index({
  label: "text",
  createdBy: "text",
  updatedBy: "text"
});
