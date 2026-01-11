// libraries
import { Model } from "mongoose";

// types
import { type PresetDocument as Document } from "@/common/types/documentation/_document";

// document
export interface FoundUsSourceDocument extends Document {
  source: string;
}

// model
export interface FoundUsSourceModel extends Model<FoundUsSourceDocument> {}
