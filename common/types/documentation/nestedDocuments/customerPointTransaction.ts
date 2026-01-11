// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type ObjectId } from "mongoose";
import { type OrderDocument } from "@/common/types/documentation/dynamic/order";

// document
export interface CustomerPointTransactionDocument extends Document {
  type: "credit" | "debit";
  order: string | ObjectId | OrderDocument;
  amount: number;
  isExpired: boolean;
}
