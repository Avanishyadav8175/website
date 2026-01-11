// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";

// document
export interface OrderPaymentGatewayDocument extends Document {
  name: "offline" | "razorpay" | "payu";
  info?: Record<string, unknown>;
}
