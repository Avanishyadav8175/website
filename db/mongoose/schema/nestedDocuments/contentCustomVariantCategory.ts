// libraries
import { Schema } from "mongoose";

// schemas
import { contentCustomVariantSchema } from "@/db/mongoose/schema/nestedDocuments/contentCustomVariant";
import { contentCustomVariantCategoryOptionSchema } from "@/db/mongoose/schema/nestedDocuments/contentCustomVariantCategoryOption";

// types
import { ContentCustomVariantCategoryDocument } from "@/common/types/documentation/nestedDocuments/contentCustomVariantCategory";

// schemas
export const contentCustomVariantCategorySchema =
  new Schema<ContentCustomVariantCategoryDocument>(
    {
      options: {
        type: contentCustomVariantCategoryOptionSchema,
        required: true
      },
      unit: {
        type: Schema.Types.ObjectId,
        ref: "Unit",
        required: false
      },
      variants: [
        {
          type: contentCustomVariantSchema,
          required: true
        }
      ]
    },
    { timestamps: true }
  );
