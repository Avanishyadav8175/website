// libraries
import { Schema } from "mongoose";

// schemas
import { blogLayoutSchema } from "@/db/mongoose/schema/nestedDocuments/blogLayout";

// types
import { BlogLayoutItemDocument } from "@/common/types/documentation/nestedDocuments/blogLayoutItem";

// schema
export const blogLayoutItemSchema = new Schema<BlogLayoutItemDocument>(
  {
    order: {
      type: Number,
      required: false
    },
    type: {
      type: String,
      enum: ["content", "faq", "image", "text", "video"],
      required: true
    },
    layout: {
      type: blogLayoutSchema,
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
    }
  },
  { timestamps: true }
);
