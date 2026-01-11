// libraries
import { Schema } from "mongoose";

// types
import {
  type QuickLinkDocument,
  type QuickLinkModel
} from "@/common/types/documentation/presets/quickLink";

// schema
export const quickLinkSchema = new Schema<QuickLinkDocument, QuickLinkModel>(
  {
    label: {
      type: String,
      required: true,
      unique: true
    },
    path: {
      type: String,
      required: true
    },
    image: {
      type: Schema.Types.ObjectId,
      ref: "Image",
      required: false
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
quickLinkSchema.index({
  label: "text",
  createdBy: "text",
  updatedBy: "text"
});
