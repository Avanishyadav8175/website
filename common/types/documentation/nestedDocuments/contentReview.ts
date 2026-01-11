// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type ObjectId } from "mongoose";
import { type ReviewDocument } from "@/common/types/documentation/dynamic/review";
import { type ReviewGroupDocument } from "@/common/types/documentation/presets/reviewGroup";

// document
export interface ContentReviewDocument extends Document {
  personalized: string[];
  group: string | ObjectId | ReviewGroupDocument;
  reviews: string[] | ObjectId[] | ReviewDocument[];
  count: number;
}
