// libraries
import { Schema } from "mongoose";

// types
import {
  type StateDocument,
  type StateModel
} from "@/common/types/documentation/presets/state";

// schema
export const stateSchema = new Schema<StateDocument, StateModel>(
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
stateSchema.index({
  name: "text",
  createdBy: "text",
  updatedBy: "text"
});
