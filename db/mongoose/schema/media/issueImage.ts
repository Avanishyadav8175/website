// libraries
import { Schema } from "mongoose";

// types
import {
  IssueImageDocument,
  IssueImageModel
} from "@/common/types/documentation/media/issueImage";

// schema
export const issueImageSchema = new Schema<IssueImageDocument, IssueImageModel>(
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
    isClosed: {
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
issueImageSchema.index({
  createdBy: "text",
  updatedBy: "text"
});
