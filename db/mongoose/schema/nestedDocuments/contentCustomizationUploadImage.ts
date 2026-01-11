// libraries
import { Schema } from "mongoose";

// types
import { ContentCustomizationUploadImageDocument } from "@/common/types/documentation/nestedDocuments/contentCustomizationUploadImage";

// schemas
export const contentCustomizationUploadImageSchema =
  new Schema<ContentCustomizationUploadImageDocument>(
    {
      label: {
        type: Schema.Types.ObjectId,
        ref: "Label",
        required: true
      },
      imageLimit: {
        type: Number,
        required: false,
        default: 1
      }
    },
    { timestamps: true }
  );
