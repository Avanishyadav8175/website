// libraries
import { Schema } from "mongoose";

// types
import {
  AITagCategoryDocument,
  AITagCategoryModel
} from "@/common/types/documentation/categories/aiTagCategory";

// schema
export const aiTagCategorySchema = new Schema<
  AITagCategoryDocument,
  AITagCategoryModel
>(
  {
    name: {
      type: String,
      required: true,
      unique: true
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
aiTagCategorySchema.index({
  name: "text",
  createdBy: "text",
  updatedBy: "text"
});
