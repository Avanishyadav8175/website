// libraries
import { Schema } from "mongoose";

// types
import {
  type RelationDocument,
  type RelationModel
} from "@/common/types/documentation/presets/relation";

// schema
export const relationSchema = new Schema<RelationDocument, RelationModel>(
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
relationSchema.index({
  name: "text",
  createdBy: "text",
  updatedBy: "text"
});
