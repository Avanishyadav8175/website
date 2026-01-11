// libraries
import { Schema } from "mongoose";

// schema
import { seoMetaSchema } from "@/db/mongoose/schema/nestedDocuments/seoMeta";

// types
import { CategoryMetaDocument } from "@/common/types/documentation/nestedDocuments/categoryMeta";

// schemas
export const categoryMetaSchema = new Schema<CategoryMetaDocument>(
  {
    path: {
      type: String,
      required: true
    },
    meta: {
      type: seoMetaSchema,
      required: true
    },
    images: [
      {
        type: String,
        required: true
      }
    ]
  },
  { timestamps: true }
);
