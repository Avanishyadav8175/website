// libraries
import { Schema } from "mongoose";

// types
import {
  BlogTagDocument,
  BlogTagModel
} from "@/common/types/documentation/blog/blogTag";

// schema
export const blogTagSchema = new Schema<BlogTagDocument, BlogTagModel>(
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
blogTagSchema.index({
  name: "text",
  createdBy: "text",
  updatedBy: "text"
});
