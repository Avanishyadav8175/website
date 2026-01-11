// libraries
import { Schema } from "mongoose";

// schemas
import { pageLayoutSchema } from "@/db/mongoose/schema/nestedDocuments/pageLayout";

// types
import { DynamicPageLayoutDocument } from "@/common/types/documentation/nestedDocuments/dynamicPageLayout";

// schema
export const dynamicPageLayoutSchema = new Schema<DynamicPageLayoutDocument>(
  {
    order: {
      type: Number,
      required: false
    },
    type: {
      type: String,
      enum: [
        "banner",
        "category",
        "collage",
        "content",
        "text",
        "faq",
        "quick-link"
      ],
      required: true
    },
    title: {
      type: String,
      required: false
    },
    subtitle: {
      type: String,
      required: false
    },
    layout: {
      type: pageLayoutSchema,
      required: true
    },
    leftAlign: {
      type: Boolean,
      required: false
    },
    extraSpacing: {
      type: Boolean,
      required: false
    },
    customBG: {
      type: String,
      required: false
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
    }
  },
  { timestamps: true }
);
