// libraries
import { Schema } from "mongoose";

// types
import { LinkDocument } from "@/common/types/documentation/nestedDocuments/link";

// schemas
export const linkSchema = new Schema<LinkDocument>(
  {
    label: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);
