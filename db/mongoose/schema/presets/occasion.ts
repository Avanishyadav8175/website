// libraries
import { Schema } from "mongoose";

// types
import {
  type OccasionDocument,
  type OccasionModel
} from "@/common/types/documentation/presets/occasion";

// schema
export const occasionSchema = new Schema<OccasionDocument, OccasionModel>(
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
occasionSchema.index({
  name: "text",
  createdBy: "text",
  updatedBy: "text"
});
