// libraries
import { Schema } from "mongoose";

// types
import { ClickableImageDocument } from "@/common/types/documentation/nestedDocuments/clickableImage";

// schemas
export const clickableImageSchema = new Schema<ClickableImageDocument>(
  {
    label: {
      type: String,
      required: false
    },
    path: {
      type: String,
      required: true
    },
    image: {
      type: Schema.Types.ObjectId,
      ref: "Image",
      required: false
    }
  },
  { timestamps: true }
);
