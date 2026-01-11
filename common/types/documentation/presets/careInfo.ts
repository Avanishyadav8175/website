// libraries
import { Model } from "mongoose";

// types
import { type PresetDocument as Document } from "@/common/types/documentation/_document";

// document
export interface CareInfoDocument extends Document {
  label: string;
  content: string[];
}

// model
export interface CareInfoModel extends Model<CareInfoDocument> {}
