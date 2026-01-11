// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type ContentCategoryDocument } from "@/common/types/documentation/categories/contentCategory";
import { type ObjectId } from "mongoose";

// document
export interface RelatedContentCategoriesDocument extends Document {
  show: boolean;
  categories?: string[] | ObjectId[] | ContentCategoryDocument[];
}
