// libraries
import { Schema } from "mongoose";

// types
import { CouponDiscountDocument } from "@/common/types/documentation/nestedDocuments/couponDiscount";

// schemas
export const couponDiscountSchema = new Schema<CouponDiscountDocument>(
  {
    type: {
      type: String,
      enum: ["fixed", "percentage"],
      required: true
    },
    limit: {
      type: Number,
      required: true
    },
    percentage: {
      type: Number,
      required: false
    }
  },
  { timestamps: true }
);
