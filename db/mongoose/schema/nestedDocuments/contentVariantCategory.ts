// libraries
import { Schema } from "mongoose";

// schemas
import { contentCustomVariantCategorySchema } from "@/db/mongoose/schema/nestedDocuments/contentCustomVariantCategory";
import { contentReferenceVariantSchema } from "@/db/mongoose/schema/nestedDocuments/contentReferenceVariant";

// types
import { ContentVariantCategoryDocument } from "@/common/types/documentation/nestedDocuments/contentVariantCategory";

// schemas
export const contentVariantCategorySchema =
  new Schema<ContentVariantCategoryDocument>(
    {
      type: {
        type: String,
        enum: ["custom", "reference"],
        required: true
      },
      label: {
        type: Schema.Types.ObjectId,
        ref: "Label",
        required: true
      },
      reference: [
        {
          type: contentReferenceVariantSchema,
          required: false
        }
      ],
      custom: {
        type: contentCustomVariantCategorySchema,
        required: false
      }
    },
    { timestamps: true }
  );
