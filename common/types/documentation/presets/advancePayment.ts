// libraries
import { Model } from "mongoose";

// types
import { type PresetDocument as Document } from "@/common/types/documentation/_document";

// document
export interface AdvancePaymentDocument extends Document {
  label: string;
  value: number;
}

// model
export interface AdvancePaymentModel extends Model<AdvancePaymentDocument> {}
