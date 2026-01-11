// libraries
import { Schema } from "mongoose";

// schemas
import { categoryChargesSchema } from "@/db/mongoose/schema/nestedDocuments/categoryCharges";
import { categoryMediaSchema } from "@/db/mongoose/schema/nestedDocuments/categoryMedia";
import { categoryMetaSchema } from "@/db/mongoose/schema/nestedDocuments/categoryMeta";
import { categoryPageSchema } from "@/db/mongoose/schema/nestedDocuments/categoryPage";
import { infoSchema } from "@/db/mongoose/schema/nestedDocuments/info";
import { personalizedReviewSchema } from "@/db/mongoose/schema/nestedDocuments/personalizedReview";
import { relatedContentCategoriesSchema } from "@/db/mongoose/schema/nestedDocuments/relatedContentCategories";
import { seoSchema } from "@/db/mongoose/schema/nestedDocuments/seo";

// types
import {
  type ContentCategoryDocument,
  type ContentCategoryModel
} from "@/common/types/documentation/categories/contentCategory";

// schema
export const contentCategorySchema = new Schema<
  ContentCategoryDocument,
  ContentCategoryModel
>(
  {
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
    redirectFrom: [
      {
        type: String,
        required: false
      }
    ],
    relatedCategories: {
      type: relatedContentCategoriesSchema,
      required: false
    },
    info: {
      type: infoSchema,
      required: false
    },
    charges: {
      type: categoryChargesSchema,
      required: false
    },
    media: {
      type: categoryMediaSchema,
      required: false
    },
    seo: {
      type: seoSchema,
      required: false
    },
    personalizedReviews: [
      {
        type: personalizedReviewSchema,
        required: false,
        default: []
      }
    ],
    _meta: {
      type: categoryMetaSchema,
      required: false
    },
    _page: {
      type: categoryPageSchema,
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
contentCategorySchema.index({
  name: "text",
  createdBy: "text",
  updatedBy: "text"
});
