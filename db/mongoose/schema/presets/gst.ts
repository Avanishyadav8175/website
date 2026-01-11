// libraries
import { Schema } from "mongoose";

// types
import {
  type GSTDocument,
  type GSTModel
} from "@/common/types/documentation/presets/gst";

// schema
export const gstSchema = new Schema<GSTDocument, GSTModel>(
  {
    label: {
      type: String,
      required: true,
      unique: true
    },
    value: {
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
gstSchema.index({
  label: "text",
  createdBy: "text",
  updatedBy: "text"
});
