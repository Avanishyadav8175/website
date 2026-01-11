// libraries
import { Schema } from "mongoose";

// types
import { ContentClassificationDocument } from "@/common/types/documentation/nestedDocuments/contentClassification";

// schemas
export const contentClassificationSchema =
  new Schema<ContentClassificationDocument>(
    {
      primary: {
        type: Schema.Types.ObjectId,
        ref: "ContentCategory",
        required: true
      },
      related: [
        {
          type: Schema.Types.ObjectId,
          ref: "ContentCategory",
          required: false
        }
      ]
    },
    { timestamps: true }
  );
