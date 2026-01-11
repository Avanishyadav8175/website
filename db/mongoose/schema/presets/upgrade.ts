// libraries
import { Schema } from "mongoose";

// types
import {
  type UpgradeDocument,
  type UpgradeModel
} from "@/common/types/documentation/presets/upgrade";

// schema
export const upgradeSchema = new Schema<UpgradeDocument, UpgradeModel>(
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
upgradeSchema.index({
  label: "text",
  createdBy: "text",
  updatedBy: "text"
});
