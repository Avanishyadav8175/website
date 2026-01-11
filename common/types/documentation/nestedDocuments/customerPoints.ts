// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type CustomerPointTransactionDocument } from "@/common/types/documentation/nestedDocuments/customerPointTransaction";

// document
export interface CustomerPointsDocument extends Document {
  credit: number;
  debit: number;
  available: number;
  expired: number;
  transactions: CustomerPointTransactionDocument[];
}
