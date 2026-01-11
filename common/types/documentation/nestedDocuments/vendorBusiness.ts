// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type ObjectId } from "mongoose";
import { type PaymentCycleDocument } from "@/common/types/documentation/presets/paymentCycle";
import { type VendorBusinessCommissionDocument } from "@/common/types/documentation/nestedDocuments/vendorBusinessCommission";
import { type VendorOfferCategoryDocument } from "@/common/types/documentation/presets/vendorOfferCategory";

// document
export interface VendorBusinessDocument extends Document {
  categories: string[] | ObjectId[] | VendorOfferCategoryDocument[];
  commission: VendorBusinessCommissionDocument;
  paymentCycle: string | ObjectId | PaymentCycleDocument;
  provideDelivery: boolean;
}
