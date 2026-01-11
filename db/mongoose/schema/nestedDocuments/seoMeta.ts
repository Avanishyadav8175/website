// libraries
import { Schema } from "mongoose";

// types
import { SEOMetaDocument } from "@/common/types/documentation/nestedDocuments/seoMeta";

// schemas
export const seoMetaSchema = new Schema<SEOMetaDocument>(
  {
    title: {
      type: String,
      required: true
    },
    tags: [
      {
        type: String,
        required: true
      }
    ],
    description: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);
