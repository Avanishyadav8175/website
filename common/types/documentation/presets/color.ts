// libraries
import { Model } from "mongoose";

// types
import { type PresetDocument as Document } from "@/common/types/documentation/_document";

// document
export interface ColorDocument extends Document {
  name: string;
  hexCode: string;
}

// model
export interface ColorModel extends Model<ColorDocument> {}
