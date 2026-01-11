// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type DeliveryPaymentDocument } from "@/common/types/documentation/nestedDocuments/deliveryPayment";
import { type DeliveryDocument } from "@/common/types/documentation/dynamic/delivery";
import { type ObjectId } from "mongoose";

// document
export interface VendorBalanceTransactionDocument extends Document {
  status: "pending" | "paid" | "canceled";
  delivery: string | ObjectId | DeliveryDocument;
  amount: DeliveryPaymentDocument;
  deliveredOn?: string | Date;
}
