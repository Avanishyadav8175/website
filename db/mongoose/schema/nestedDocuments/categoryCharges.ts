// libraries
import { Schema } from "mongoose";

// types
import { CategoryChargesDocument } from "@/common/types/documentation/nestedDocuments/categoryCharges";

// schemas
export const categoryChargesSchema = new Schema<CategoryChargesDocument>(
  {
    advancePayment: {
      type: Schema.Types.ObjectId,
      ref: "AdvancePayment",
      required: true
    },
    deliveryCharge: {
      type: Number,
      required: true
    },
    gst: {
      type: Schema.Types.ObjectId,
      ref: "GST",
      required: false
    }
  },
  { timestamps: true }
);
