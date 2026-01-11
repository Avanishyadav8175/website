// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";

// document
export interface CouponDiscountDocument extends Document {
  type: "fixed" | "percentage";
  limit: number;
  percentage?: number;
}
