// libraries
import { Model } from "mongoose";

// types
import { type PresetDocument as Document } from "@/common/types/documentation/_document";
import { type ContentCategoryDocument } from "@/common/types/documentation/categories/contentCategory";
import { type ObjectId } from "mongoose";

// document
export interface ReviewGroupDocument extends Document {
  category?: string | ObjectId | ContentCategoryDocument;
  name: string;
  reviews: string[];
}

// model
export interface ReviewGroupModel extends Model<ReviewGroupDocument> {}
