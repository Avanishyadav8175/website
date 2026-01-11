// types
import { type PresetDocument } from "@/common/types/documentation/_document";
import { type Model } from "mongoose";

// document
export interface BlogCategoryDocument extends PresetDocument {
  name: string;
}

// model
export interface BlogCategoryModel extends Model<BlogCategoryDocument> {}
