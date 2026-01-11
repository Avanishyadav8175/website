// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";

// document
export interface SettingPaymentActiveGatewaysDocument extends Document {
  razorpay: boolean;
  payu: boolean;
}
