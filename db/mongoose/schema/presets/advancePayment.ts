// libraries
import { Schema } from "mongoose";

// types
import {
  type AdvancePaymentDocument,
  type AdvancePaymentModel
} from "@/common/types/documentation/presets/advancePayment";

// schema
export const advancePaymentSchema = new Schema<
  AdvancePaymentDocument,
  AdvancePaymentModel
>(
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
advancePaymentSchema.index({
  label: "text",
  createdBy: "text",
  updatedBy: "text"
});
