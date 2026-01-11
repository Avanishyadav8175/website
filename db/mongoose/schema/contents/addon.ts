// libraries
import { Schema } from "mongoose";

// schemas
import { edibleSchema } from "@/db/mongoose/schema/nestedDocuments/edible";

// types
import {
  AddonDocument,
  AddonModel
} from "@/common/types/documentation/contents/addon";

// schema
export const addonSchema = new Schema<AddonDocument, AddonModel>(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "AddonCategory",
      required: true
    },
    name: {
      type: String,
      required: true,
      unique: true
    },
    price: {
      type: Number,
      required: true
    },
    image: {
      type: Schema.Types.ObjectId,
      ref: "Image",
      required: true
    },
    edible: {
      type: edibleSchema,
      required: true
    },
    isCustomizable: {
      type: Boolean,
      required: false,
      default: false
    },
    customizationLabel: {
      type: String,
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
addonSchema.index({
  name: "text",
  createdBy: "text",
  updatedBy: "text"
});
