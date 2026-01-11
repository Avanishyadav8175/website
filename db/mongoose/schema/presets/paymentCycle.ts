// libraries
import { Schema } from "mongoose";

// types
import {
  type PaymentCycleDocument,
  type PaymentCycleModel
} from "@/common/types/documentation/presets/paymentCycle";

// schema
export const paymentCycleSchema = new Schema<
  PaymentCycleDocument,
  PaymentCycleModel
>(
  {
    label: {
      type: String,
      required: true,
      unique: true
    },
    days: {
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
paymentCycleSchema.index({
  label: "text",
  createdBy: "text",
  updatedBy: "text"
});
