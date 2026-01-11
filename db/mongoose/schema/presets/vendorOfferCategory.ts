// libraries
import { Schema } from "mongoose";

// types
import {
  type VendorOfferCategoryDocument,
  type VendorOfferCategoryModel
} from "@/common/types/documentation/presets/vendorOfferCategory";

// schema
export const vendorOfferCategorySchema = new Schema<
  VendorOfferCategoryDocument,
  VendorOfferCategoryModel
>(
  {
    type: {
      type: String,
      enum: ["product", "service"],
      required: true
    },
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
vendorOfferCategorySchema.index({
  name: "text",
  createdBy: "text",
  updatedBy: "text"
});
