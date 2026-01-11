// libraries
import { Schema } from "mongoose";

// types
import {
  CustomizationImageDocument,
  CustomizationImageModel
} from "@/common/types/documentation/media/customizationImage";

// schema
export const customizationImageSchema = new Schema<
  CustomizationImageDocument,
  CustomizationImageModel
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
    contentName: {
      type: String,
      required: true
    },
    isInCart: {
      type: Boolean,
      required: false,
      default: false
    },
    isOrdered: {
      type: Boolean,
      required: false,
      default: false
    },
    isDelivered: {
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
customizationImageSchema.index({
  createdBy: "text",
  updatedBy: "text"
});
