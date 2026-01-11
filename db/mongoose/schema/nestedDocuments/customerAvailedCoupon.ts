// libraries
import { Schema } from "mongoose";

// types
import { CustomerAvailedCouponDocument } from "@/common/types/documentation/nestedDocuments/customerAvailedCoupon";

// schemas
export const customerAvailedCouponSchema =
  new Schema<CustomerAvailedCouponDocument>(
    {
      coupon: {
        type: Schema.Types.ObjectId,
        ref: "Coupon",
        required: true
      },
      times: {
        type: Number,
        required: false,
        default: 1
      }
    },
    { timestamps: true }
  );
