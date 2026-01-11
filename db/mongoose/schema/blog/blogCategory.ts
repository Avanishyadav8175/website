// libraries
import { Schema } from "mongoose";

// types
import {
  type BlogCategoryDocument,
  type BlogCategoryModel
} from "@/common/types/documentation/blog/blogCategory";

// schema
export const blogCategorySchema = new Schema<
  BlogCategoryDocument,
  BlogCategoryModel
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
blogCategorySchema.index({
  name: "text",
  createdBy: "text",
  updatedBy: "text"
});
