// libraries
import { Schema } from "mongoose";

// types
import {
  type BlogAuthorDocument,
  type BlogAuthorModel
} from "@/common/types/documentation/blog/blogAuthor";

// schema
export const blogAuthorSchema = new Schema<BlogAuthorDocument, BlogAuthorModel>(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    bio: {
      type: String,
      required: false
    },
    photo: {
      type: Schema.Types.ObjectId,
      ref: "Image",
      required: false
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
blogAuthorSchema.index({
  name: "text",
  createdBy: "text",
  updatedBy: "text"
});
