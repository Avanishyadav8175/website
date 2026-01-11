// libraries
import { Schema } from "mongoose";

// schemas
import { dynamicPageLayoutSchema } from "@/db/mongoose/schema/nestedDocuments/dynamicPageLayout";
import { seoMetaSchema } from "@/db/mongoose/schema/nestedDocuments/seoMeta";

// types
import {
  DynamicPageDocument,
  DynamicPageModel
} from "@/common/types/documentation/pages/dynamicPage";

// schema
export const dynamicPageSchema = new Schema<
  DynamicPageDocument,
  DynamicPageModel
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
    layouts: [
      {
        type: dynamicPageLayoutSchema,
        required: true
      }
    ],
    seoMeta: {
      type: seoMetaSchema,
      required: true
    },
    layoutCounter: {
      type: Number,
      required: false,
      default: 0
    },
    isActive: {
      type: Boolean,
      required: false,
      default: true
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
dynamicPageSchema.index({
  name: "text",
  slug: "text",
  createdBy: "text",
  updatedBy: "text"
});
