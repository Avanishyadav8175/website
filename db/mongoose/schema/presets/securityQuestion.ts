// libraries
import { Schema } from "mongoose";

// types
import {
  type SecurityQuestionDocument,
  type SecurityQuestionModel
} from "@/common/types/documentation/presets/securityQuestion";

// schema
export const securityQuestionSchema = new Schema<
  SecurityQuestionDocument,
  SecurityQuestionModel
>(
  {
    question: {
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
securityQuestionSchema.index({
  question: "text",
  createdBy: "text",
  updatedBy: "text"
});
