// libraries
import { Schema } from "mongoose";

// types
import {
  FolderDocument,
  FolderModel
} from "@/common/types/documentation/media/folder";

// schema
export const folderSchema = new Schema<FolderDocument, FolderModel>(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    label: {
      type: String,
      required: true,
      unique: true
    },
    imageCount: {
      type: Number,
      required: false,
      default: 0
    },
    colorName: {
      type: String,
      enum: ["red", "blue", "amber", "jade", "purple"],
      required: true
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
folderSchema.index({
  label: "text",
  createdBy: "text",
  updatedBy: "text"
});
