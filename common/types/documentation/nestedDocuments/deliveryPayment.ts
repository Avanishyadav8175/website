// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";

// document
export interface DeliveryPaymentDocument extends Document {
  total: number;
  toBeCollected: number;
  pending: number;
}
