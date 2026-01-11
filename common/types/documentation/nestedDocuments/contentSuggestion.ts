// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type ObjectId } from "mongoose";

// document
export interface ContentSuggestionDocument extends Document {
  aiTag: string[] | ObjectId[] | ContentDocument[];
  relatedAITag?: string[] | ObjectId[] | ContentDocument[];
  category: string[] | ObjectId[] | ContentDocument[];
}
