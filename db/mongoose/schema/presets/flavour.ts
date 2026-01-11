// libraries
import { Schema } from "mongoose";

// types
import {
  type FlavourDocument,
  type FlavourModel
} from "@/common/types/documentation/presets/flavour";

// schema
export const flavourSchema = new Schema<FlavourDocument, FlavourModel>(
  {
    name: {
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
flavourSchema.index({
  name: "text",
  createdBy: "text",
  updatedBy: "text"
});
