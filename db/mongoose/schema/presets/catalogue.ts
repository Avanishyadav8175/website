// libraries
import { Schema } from "mongoose";

// types
import {
  type CatalogueDocument,
  type CatalogueModel
} from "@/common/types/documentation/presets/catalogue";

// schema
export const catalogueSchema = new Schema<CatalogueDocument, CatalogueModel>(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "CatalogueCategory",
      required: true
    },
    name: {
      type: String,
      required: true,
      unique: true
    },
    path: {
      type: String,
      required: true
    },
    icon: {
      type: Schema.Types.ObjectId,
      ref: "Image",
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
catalogueSchema.index({
  name: "text",
  createdBy: "text",
  updatedBy: "text"
});
