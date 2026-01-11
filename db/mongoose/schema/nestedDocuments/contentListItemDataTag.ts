// libraries
import { Schema } from "mongoose";

// types
import { type ContentListItemDataTagDocument } from "@/common/types/documentation/nestedDocuments/contentListItemDataTag";

// schemas
export const contentListItemDataTagSchema =
  new Schema<ContentListItemDataTagDocument>(
    {
      label: {
        type: String,
        required: true
      },
      backgroundColor: {
        type: String,
        required: true
      },
      textColor: {
        type: String,
        required: false
      }
    },
    { timestamps: true }
  );
