// libraries
import { Schema } from "mongoose";

// schemas
import { couponDiscountSchema } from "@/db/mongoose/schema/nestedDocuments/couponDiscount";
import { couponValiditySchema } from "@/db/mongoose/schema/nestedDocuments/couponValidity";

// types
import {
  CouponDocument,
  CouponModel
} from "@/common/types/documentation/contents/coupon";

// schema
export const couponSchema = new Schema<CouponDocument, CouponModel>(
  {
    type: {
      type: String,
      enum: ["discount", "free-delivery"],
      required: true
    },
    code: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    },
    minimumOrderAmount: {
      type: Number,
      required: true
    },
    limitPerCustomer: {
      type: Number,
      required: true
    },
    valid: {
      type: couponValiditySchema,
      required: true
    },
    discount: {
      type: couponDiscountSchema,
      required: false
    },
    applicableCategories: [
      {
        type: Schema.Types.ObjectId,
        ref: "ContentCategory",
        required: false
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
couponSchema.index({
  code: "text",
  createdBy: "text",
  updatedBy: "text"
});
