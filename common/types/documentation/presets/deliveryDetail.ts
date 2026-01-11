// libraries
import { Model } from "mongoose";

// types
import { type PresetDocument as Document } from "@/common/types/documentation/_document";

// document
export interface DeliveryDetailDocument extends Document {
  label: string;
  content: string[];
}

// model
export interface DeliveryDetailModel extends Model<DeliveryDetailDocument> {}
