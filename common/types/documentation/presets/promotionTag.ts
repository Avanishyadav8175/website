// libraries
import { Model } from "mongoose";

// types
import { type PresetDocument as Document } from "@/common/types/documentation/_document";
import { type ColorDocument } from "@/common/types/documentation/presets/color";
import { type ObjectId } from "mongoose";

// document
export interface PromotionTagDocument extends Document {
  name: string;
  color: string | ObjectId | ColorDocument;
}

// model
export interface PromotionTagModel extends Model<PromotionTagDocument> {}
