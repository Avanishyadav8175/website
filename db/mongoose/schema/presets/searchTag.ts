// libraries
import { Schema } from "mongoose";

// types
import {
  type SearchTagDocument,
  type SearchTagModel
} from "@/common/types/documentation/presets/searchTag";

// schema
export const searchTagSchema = new Schema<SearchTagDocument, SearchTagModel>(
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
searchTagSchema.index({
  name: "text",
  createdBy: "text",
  updatedBy: "text"
});
