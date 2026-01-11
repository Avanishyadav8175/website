// libraries
import { Schema } from "mongoose";

// schemas
import { catalogueSchema } from "../presets/catalogue";

// types
import {
  type CatalogueCategoryDocument,
  type CatalogueCategoryModel
} from "@/common/types/documentation/categories/catalogueCategory";

// schema
export const catalogueCategorySchema = new Schema<
  CatalogueCategoryDocument,
  CatalogueCategoryModel
>(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    title: {
      type: String,
      required: true
    },
    icon: {
      type: Schema.Types.ObjectId,
      ref: "Image",
      required: true
    },
    _catalogues: [
      {
        type: Schema.Types.ObjectId,
        ref: "Catalogue",
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
catalogueCategorySchema.index({
  name: "text",
  createdBy: "text",
  updatedBy: "text"
});
