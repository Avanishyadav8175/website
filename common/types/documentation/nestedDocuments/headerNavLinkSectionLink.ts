// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type ObjectId } from "mongoose";
import { type PromotionTagDocument } from "@/common/types/documentation/presets/promotionTag";

// document
export interface HeaderNavLinkSectionLinkDocument extends Document {
  label: string;
  path: string;
  tag?: string | ObjectId | PromotionTagDocument;
}
