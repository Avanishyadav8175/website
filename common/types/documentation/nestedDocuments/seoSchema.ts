// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";

// document
export interface SEOSchemaDocument extends Document {
  name: string;
  totalRatingCount: number;
  maxRatingValue: number;
  ratingValue: number;
  maxPrice: number;
  minPrice: number;
  totalItems: number;
}
