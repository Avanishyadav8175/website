// libraries
import { Schema } from "mongoose";

// types
import {
  type LabelDocument,
  type LabelModel
} from "@/common/types/documentation/presets/label";

// schema
export const labelSchema = new Schema<LabelDocument, LabelModel>(
  {
    label: {
      type: String,
      required: true,
      unique: true
    },
    isActive: {
      type: Boolean,
      required: false,
      default: false
    },
    isDeleted: {
      type: Boolean,
      required: false,
      default: false
    },
    createdBy: {
      type: String,
      required: true
    },
    updatedBy: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

// search index
labelSchema.index({
  question: "text",
  createdBy: "text",
  updatedBy: "text"
});
