// libraries
import { Model } from "mongoose";

// types
import { type PresetDocument as Document } from "@/common/types/documentation/_document";

// document
export interface ProcessingTimeDocument extends Document {
  label: string;
  hours: number;
}

// model
export interface ProcessingTimeModel extends Model<ProcessingTimeDocument> {}
