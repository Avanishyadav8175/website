// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type VendorPaymentBankDocument } from "@/common/types/documentation/nestedDocuments/vendorPaymentBank";

// document
export interface VendorPaymentDocument extends Document {
  gstNumber?: string;
  bank: VendorPaymentBankDocument;
  upi: string;
}
