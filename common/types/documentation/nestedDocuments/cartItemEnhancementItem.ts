// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type EnhancementDocument } from "@/common/types/documentation/presets/enhancement";
import { type ObjectId } from "mongoose";

// document
export interface CartItemEnhancementItemDocument extends Document {
  enhancement: string | ObjectId | EnhancementDocument;
  price: number;
}
