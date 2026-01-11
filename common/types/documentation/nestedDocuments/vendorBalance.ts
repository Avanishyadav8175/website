// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type VendorBalanceTransactionDocument } from "@/common/types/documentation/nestedDocuments/vendorBalanceTransaction";
import { type VendorBalanceUnsettledDocument } from "@/common/types/documentation/nestedDocuments/vendorBalanceUnsettled";

// document
export interface VendorBalanceDocument extends Document {
  settled: number;
  unsettled: VendorBalanceUnsettledDocument;
  transactions: VendorBalanceTransactionDocument[];
}
