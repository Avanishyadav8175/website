// libraries
import { Schema } from "mongoose";

// types
import {
  type FoundUsSourceDocument,
  type FoundUsSourceModel
} from "@/common/types/documentation/presets/foundUsSource";

// schema
export const foundUsSourceSchema = new Schema<
  FoundUsSourceDocument,
  FoundUsSourceModel
>(
  {
    source: {
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
foundUsSourceSchema.index({
  source: "text",
  createdBy: "text",
  updatedBy: "text"
});
