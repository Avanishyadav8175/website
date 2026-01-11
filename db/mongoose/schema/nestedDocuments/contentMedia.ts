// libraries
import { Schema } from "mongoose";

// types
import { ContentMediaDocument } from "@/common/types/documentation/nestedDocuments/contentMedia";

// schemas
export const contentMediaSchema = new Schema<ContentMediaDocument>(
  {
    primary: {
      type: Schema.Types.ObjectId,
      ref: "Image",
      required: true
    },
    gallery: [
      {
        type: Schema.Types.ObjectId,
        ref: "Image",
        required: false
      }
    ],
    video: {
      type: String,
      required: false
    },
    review: [
      {
        type: Schema.Types.ObjectId,
        ref: "Image",
        required: false
      }
    ]
  },
  { timestamps: true }
);
