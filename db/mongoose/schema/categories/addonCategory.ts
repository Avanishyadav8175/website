// libraries
import { Schema } from "mongoose";

// types
import {
  AddonCategoryDocument,
  AddonCategoryModel
} from "@/common/types/documentation/categories/addonCategory";

// schema
export const addonCategorySchema = new Schema<
  AddonCategoryDocument,
  AddonCategoryModel
>(
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
addonCategorySchema.index({
  name: "text",
  createdBy: "text",
  updatedBy: "text"
});
