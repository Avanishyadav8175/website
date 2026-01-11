// libraries
import { Schema } from "mongoose";

// types
import {
  type VenueDocument,
  type VenueModel
} from "@/common/types/documentation/presets/venue";

// schema
export const venueSchema = new Schema<VenueDocument, VenueModel>(
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
venueSchema.index({
  name: "text",
  createdBy: "text",
  updatedBy: "text"
});
