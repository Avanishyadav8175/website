// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type ContentEnhancementItemDocument } from "@/common/types/documentation/nestedDocuments/contentEnhancementItem";
import { type LabelDocument } from "../presets/label";
import { type ObjectId } from "mongoose";

// document
export interface ContentEnhancementDocument extends Document {
  label: string | ObjectId | LabelDocument;
  items: ContentEnhancementItemDocument[];
}
