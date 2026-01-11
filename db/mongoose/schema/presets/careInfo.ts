// libraries
import { Schema } from "mongoose";

// types
import {
  type CareInfoDocument,
  type CareInfoModel
} from "@/common/types/documentation/presets/careInfo";

// schema
export const careInfoSchema = new Schema<CareInfoDocument, CareInfoModel>(
  {
    label: {
      type: String,
      required: true,
      unique: true
    },
    content: [
      {
        type: String,
        required: true
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
careInfoSchema.index({
  label: "text",
  createdBy: "text",
  updatedBy: "text"
});
