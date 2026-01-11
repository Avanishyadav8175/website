// libraries
import { Schema } from "mongoose";

// types
import { type ContentListItemDataImageDocument } from "@/common/types/documentation/nestedDocuments/contentListItemDataImage";

// schemas
export const contentListItemDataImageSchema =
  new Schema<ContentListItemDataImageDocument>(
    {
      alt: {
        type: String,
        required: false
      },
      url: {
        type: String,
        required: false
      }
    },
    { timestamps: true }
  );
