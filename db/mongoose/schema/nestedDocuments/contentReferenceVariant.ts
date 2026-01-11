// libraries
import { Schema } from "mongoose";

// types
import { ContentReferenceVariantDocument } from "@/common/types/documentation/nestedDocuments/contentReferenceVariant";

// schemas
export const contentReferenceVariantSchema =
  new Schema<ContentReferenceVariantDocument>(
    {
      label: {
        type: String,
        required: true
      },
      reference: {
        type: Schema.Types.ObjectId,
        ref: "Content",
        required: true
      }
    },
    { timestamps: true }
  );
