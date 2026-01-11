// libraries
import { Schema } from "mongoose";

// types
import {
  IdentificationImageDocument,
  IdentificationImageModel
} from "@/common/types/documentation/media/identificationImage";

// schema
export const identificationImageSchema = new Schema<
  IdentificationImageDocument,
  IdentificationImageModel
>(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    extension: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    size: {
      type: Number,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    inUse: {
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
identificationImageSchema.index({
  createdBy: "text",
  updatedBy: "text"
});
