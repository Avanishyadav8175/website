// libraries
import { Schema } from "mongoose";

// types
import {
  type CityDocument,
  type CityModel
} from "@/common/types/documentation/presets/city";

// schema
export const citySchema = new Schema<CityDocument, CityModel>(
  {
    state: {
      type: Schema.Types.ObjectId,
      ref: "State",
      required: true
    },
    name: {
      type: String,
      required: true,
      unique: true
    },
    aliases: [
      {
        type: String,
        required: false
      }
    ],
    isTopCity: {
      type: Boolean,
      required: false,
      default: false
    },
    icon: {
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
citySchema.index({
  name: "text",
  aliases: "text",
  createdBy: "text",
  updatedBy: "text"
});
