// libraries
import { Model } from "mongoose";

// types
import { type CategoryDocument } from "@/common/types/documentation/_document";

// document
export interface AddonCategoryDocument extends CategoryDocument {
  name: string;
}

// model
export interface AddonCategoryModel extends Model<AddonCategoryDocument> {}
