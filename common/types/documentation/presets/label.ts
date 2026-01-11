// libraries
import { Model } from "mongoose";

// types
import { type PresetDocument as Document } from "@/common/types/documentation/_document";

// document
export interface LabelDocument extends Document {
  label: string;
}

// model
export interface LabelModel extends Model<LabelDocument> {}
