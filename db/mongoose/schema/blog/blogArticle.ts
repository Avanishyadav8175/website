// libraries
import { Schema } from "mongoose";

// schemas
import { blogArticleSuggestionSchema } from "../nestedDocuments/blogArticleSuggestion";
import { blogLayoutItemSchema } from "@/db/mongoose/schema/nestedDocuments/blogLayoutItem";
import { seoMetaSchema } from "@/db/mongoose/schema/nestedDocuments/seoMeta";

// types
import {
  type BlogArticleDocument,
  type BlogArticleModel
} from "@/common/types/documentation/blog/blogArticle";

// schema
export const blogArticleSchema = new Schema<
  BlogArticleDocument,
  BlogArticleModel
>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "BlogAuthor",
      required: true
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "BlogCategory",
        required: true
      }
    ],
    name: {
      type: String,
      required: true,
      unique: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    heading: {
      type: String,
      required: true
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "BlogTag",
        required: true
      }
    ],
    meta: {
      type: seoMetaSchema,
      required: true
    },
    layouts: [
      {
        type: blogLayoutItemSchema,
        required: true
      }
    ],
    layoutCounter: {
      type: Number,
      required: false,
      default: 0
    },
    _suggestions: [
      {
        type: blogArticleSuggestionSchema,
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
blogArticleSchema.index({
  name: "text",
  slug: "text",
  createdBy: "text",
  updatedBy: "text"
});
