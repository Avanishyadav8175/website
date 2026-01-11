// libraries
import { Model } from "mongoose";

// types
import { type CategoryDocument } from "@/common/types/documentation/_document";

// document
export interface AITagCategoryDocument extends CategoryDocument {
  name: string;
}

// model
export interface AITagCategoryModel extends Model<AITagCategoryDocument> {}
