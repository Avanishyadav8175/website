// libraries
import { Schema } from "mongoose";

// types
import {
  type EnhancementDocument,
  type EnhancementModel
} from "@/common/types/documentation/presets/enhancement";

// schema
export const enhancementSchema = new Schema<
  EnhancementDocument,
  EnhancementModel
>(
  {
    image: {
      type: Schema.Types.ObjectId,
      ref: "Image",
      required: true
    },
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
enhancementSchema.index({
  label: "text",
  createdBy: "text",
  updatedBy: "text"
});
