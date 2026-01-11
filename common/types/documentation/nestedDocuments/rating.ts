// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";

// document
export interface RatingDocument extends Document {
  value: number;
  count: number;
}
