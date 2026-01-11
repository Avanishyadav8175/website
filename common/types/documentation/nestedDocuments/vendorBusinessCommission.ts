// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type CommissionDocument } from "@/common/types/documentation/presets/commission";
import { type ObjectId } from "mongoose";

// document
export interface VendorBusinessCommissionDocument extends Document {
  type: "fixed" | "percentage";
  percentage?: string | ObjectId | CommissionDocument;
}
