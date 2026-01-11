// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";

// document
export interface CouponValidityDocument extends Document {
  from: string | Date;
  till: string | Date;
}
