// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type CouponDocument } from "@/common/types/documentation/contents/coupon";
import { type ObjectId } from "mongoose";

// document
export interface CustomerAvailedCouponDocument extends Document {
  coupon: string | ObjectId | CouponDocument;
  times: number;
}
