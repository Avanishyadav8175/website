// libraries
import { Schema } from "mongoose";

// types
import { CouponValidityDocument } from "@/common/types/documentation/nestedDocuments/couponValidity";

// schemas
export const couponValiditySchema = new Schema<CouponValidityDocument>(
  {
    from: {
      type: Date,
      required: true
    },
    till: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);
