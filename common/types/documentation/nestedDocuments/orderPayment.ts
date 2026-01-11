// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type OrderPaymentGatewayDocument } from "@/common/types/documentation/nestedDocuments/orderPaymentGateway";

// document
export interface OrderPaymentDocument extends Document {
  status: "pending" | "completed";
  percentage: number;
  amount: number;
  gateway: OrderPaymentGatewayDocument;
}
