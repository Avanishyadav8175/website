// libraries
import { Schema } from "mongoose";

// types
import { ContentCustomizationUploadTextDocument } from "@/common/types/documentation/nestedDocuments/contentCustomizationUploadText";

// schemas
export const contentCustomizationUploadTextSchema =
  new Schema<ContentCustomizationUploadTextDocument>(
    {
      label: {
        type: Schema.Types.ObjectId,
        ref: "Label",
        required: true
      },
      characterLimit: {
        type: Number,
        required: false,
        default: 35
      }
    },
    { timestamps: true }
  );
