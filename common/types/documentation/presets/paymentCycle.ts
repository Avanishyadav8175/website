// libraries
import { Model } from "mongoose";

// types
import { type PresetDocument as Document } from "@/common/types/documentation/_document";

// document
export interface PaymentCycleDocument extends Document {
  label: string;
  days: number;
}

// model
export interface PaymentCycleModel extends Model<PaymentCycleDocument> {}
