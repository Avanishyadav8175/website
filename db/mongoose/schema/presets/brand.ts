// libraries
import { Schema } from "mongoose";

// schemas
import { bannerSchema } from "@/db/mongoose/schema/nestedDocuments/banner";
import { ratingSchema } from "@/db/mongoose/schema/nestedDocuments/rating";

// types
import {
  type BrandDocument,
  type BrandModel
} from "@/common/types/documentation/presets/brand";

// schema
export const brandSchema = new Schema<BrandDocument, BrandModel>(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    mail: {
      type: String,
      required: true,
      unique: true
    },
    contactNumber: {
      type: String,
      required: true,
      unique: true
    },
    address: {
      type: String,
      required: true,
      unique: true
    },
    banner: {
      type: bannerSchema,
      required: false
    },
    rating: {
      type: ratingSchema,
      required: false
    },
    reviews: [
      {
        type: String,
        required: false
      }
    ],
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
brandSchema.index({
  name: "text",
  createdBy: "text",
  updatedBy: "text"
});
