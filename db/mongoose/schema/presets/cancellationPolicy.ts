// libraries
import { Schema } from "mongoose";

// types
import {
  type CancellationPolicyDocument,
  type CancellationPolicyModel
} from "@/common/types/documentation/presets/cancellationPolicy";

// schema
export const cancellationPolicySchema = new Schema<
  CancellationPolicyDocument,
  CancellationPolicyModel
>(
  {
    label: {
      type: String,
      required: true,
      unique: true
    },
    content: {
      type: String,
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
cancellationPolicySchema.index({
  label: "text",
  createdBy: "text",
  updatedBy: "text"
});
