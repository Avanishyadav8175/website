// libraries
import { Schema } from "mongoose";

// types
import {
  type ColorDocument,
  type ColorModel
} from "@/common/types/documentation/presets/color";

// schema
export const colorSchema = new Schema<ColorDocument, ColorModel>(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    hexCode: {
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
colorSchema.index({
  name: "text",
  createdBy: "text",
  updatedBy: "text"
});
