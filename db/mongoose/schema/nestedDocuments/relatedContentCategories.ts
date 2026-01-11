// libraries
import { Schema } from "mongoose";

// types
import { RelatedContentCategoriesDocument } from "@/common/types/documentation/nestedDocuments/relatedContentCategories";

// schemas
export const relatedContentCategoriesSchema =
  new Schema<RelatedContentCategoriesDocument>(
    {
      show: {
        type: Boolean,
        required: true
      },
      categories: [
        {
          type: Schema.Types.ObjectId,
          ref: "ContentCategory",
          required: false,
          default: []
        }
      ]
    },
    { timestamps: true }
  );
