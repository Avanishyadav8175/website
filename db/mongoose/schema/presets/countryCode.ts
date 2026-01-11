// libraries
import { Schema } from "mongoose";

// types
import {
  type CountryCodeDocument,
  type CountryCodeModel
} from "@/common/types/documentation/presets/countryCode";

// schema
export const countryCodeSchema = new Schema<
  CountryCodeDocument,
  CountryCodeModel
>(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    code: {
      type: String,
      required: true
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
countryCodeSchema.index({
  name: "text",
  code: "text",
  createdBy: "text",
  updatedBy: "text"
});
