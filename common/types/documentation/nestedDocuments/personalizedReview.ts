// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";

// document
export interface PersonalizedReviewDocument extends Document {
  area?: string;
  review: string;
}
