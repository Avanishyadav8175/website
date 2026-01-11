// libraries
import { Model } from "mongoose";

// types
import { type PresetDocument as Document } from "@/common/types/documentation/_document";

// document
export interface UpgradeDocument extends Document {
  label: string;
}

// model
export interface UpgradeModel extends Model<UpgradeDocument> {}
