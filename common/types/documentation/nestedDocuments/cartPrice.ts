// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";

// document
export interface CartPriceDocument extends Document {
  content: number;
  addon: number;
  customization: number;
  deliveryCharge: number;
  total: number;
  paymentPercentage: number;
  couponDiscount: number;
  payable: number;
  due: number;
}
