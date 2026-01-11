// libraries
import { Schema } from "mongoose";

// types
import { SettingSocialDetailDocument } from "@/common/types/documentation/nestedDocuments/settingSocialDetail";

// schemas
export const settingSocialDetailSchema =
  new Schema<SettingSocialDetailDocument>(
    {
      name: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      },
      icon: {
        type: Schema.Types.ObjectId,
        ref: "Image",
        required: true
      }
    },
    { timestamps: true }
  );
