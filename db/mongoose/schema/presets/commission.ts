// libraries
import { Schema } from "mongoose";

// types
import {
  type CommissionDocument,
  type CommissionModel
} from "@/common/types/documentation/presets/commission";

// schema
export const commissionSchema = new Schema<CommissionDocument, CommissionModel>(
  {
    label: {
      type: String,
      required: true,
      unique: true
    },
    value: {
      type: Number,
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
commissionSchema.index({
  label: "text",
  createdBy: "text",
  updatedBy: "text"
});
