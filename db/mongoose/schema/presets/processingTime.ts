// libraries
import { Schema } from "mongoose";

// types
import {
  type ProcessingTimeDocument,
  type ProcessingTimeModel
} from "@/common/types/documentation/presets/processingTime";

// schema
export const processingTimeSchema = new Schema<
  ProcessingTimeDocument,
  ProcessingTimeModel
>(
  {
    label: {
      type: String,
      required: true,
      unique: true
    },
    hours: {
      type: Number,
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
processingTimeSchema.index({
  label: "text",
  createdBy: "text",
  updatedBy: "text"
});
