// libraries
import { Model } from "mongoose";

// types
import { type PresetDocument as Document } from "@/common/types/documentation/_document";
import { type AITagCategoryDocument } from "../categories/aiTagCategory";
import { type ObjectId } from "mongoose";

// document
export interface AITagDocument extends Document {
  category: string | ObjectId | AITagCategoryDocument;
  name: string;
}

// model
export interface AITagModel extends Model<AITagDocument> {}
