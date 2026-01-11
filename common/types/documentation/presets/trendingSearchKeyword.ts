// libraries
import { Model } from "mongoose";

// types
import { type PresetDocument as Document } from "@/common/types/documentation/_document";

// document
export interface TrendingSearchKeywordDocument extends Document {
  label: string;
  path: string;
}

// model
export interface TrendingSearchKeywordModel
  extends Model<TrendingSearchKeywordDocument> {}
