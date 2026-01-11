// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";

// document
export interface ContentRatingDocument extends Document {
  maxValue: number;
  value: number;
  count: number;
}
