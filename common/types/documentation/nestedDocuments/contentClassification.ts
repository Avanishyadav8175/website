// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type ContentCategoryDocument } from "@/common/types/documentation/categories/contentCategory";
import { type ObjectId } from "mongoose";

// document
export interface ContentClassificationDocument extends Document {
  primary: string | ObjectId | ContentCategoryDocument;
  related: string[] | ObjectId[] | ContentCategoryDocument[];
}
