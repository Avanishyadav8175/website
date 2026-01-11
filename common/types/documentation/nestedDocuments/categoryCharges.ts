// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type AdvancePaymentDocument } from "@/common/types/documentation/presets/advancePayment";
import { type GSTDocument } from "@/common/types/documentation/presets/gst";
import { type ObjectId } from "mongoose";

// document
export interface CategoryChargesDocument extends Document {
  advancePayment: string | ObjectId | AdvancePaymentDocument;
  deliveryCharge: number;
  gst?: string | ObjectId | GSTDocument;
}
