// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type AITagDocument } from "@/common/types/documentation/presets/aiTag";
import { type ObjectId } from "mongoose";
import { type PromotionTagDocument } from "@/common/types/documentation/presets/promotionTag";
import { type SearchTagDocument } from "@/common/types/documentation/presets/searchTag";

// document
export interface ContentTagDocument extends Document {
  aiTags: string[] | ObjectId[] | AITagDocument[];
  relatedAITags?: string[] | ObjectId[] | AITagDocument[];
  promotionTag?: string | ObjectId | PromotionTagDocument;
  searchTags: string[] | ObjectId[] | SearchTagDocument[];
}
