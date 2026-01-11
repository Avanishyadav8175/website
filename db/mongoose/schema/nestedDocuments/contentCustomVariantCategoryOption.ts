// libraries
import { Schema } from "mongoose";

// types
import { ContentCustomVariantCategoryOptionDocument } from "@/common/types/documentation/nestedDocuments/contentCustomVariantCategoryOption";

// schemas
export const contentCustomVariantCategoryOptionSchema =
  new Schema<ContentCustomVariantCategoryOptionDocument>(
    {
      image: {
        type: Boolean,
        required: false,
        default: false
      },
      unit: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    { timestamps: true }
  );
