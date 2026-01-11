// libraries
import { Model } from "mongoose";

// types
import { type PresetDocument as Document } from "@/common/types/documentation/_document";

// document
export interface CommissionDocument extends Document {
  label: string;
  value: number;
}

// model
export interface CommissionModel extends Model<CommissionDocument> {}
