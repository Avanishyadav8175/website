// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";

// document
export interface VendorPaymentBankDocument extends Document {
  name: string;
  branch: string;
  ifsc: string;
  accountType: "current" | "savings";
  accountNumber: string;
  accountHolderName: string;
}
