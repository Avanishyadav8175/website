// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type ContentDocument } from "@/common/types/documentation/contents/content";

// document
export interface CategoryPageDocument extends Document {
  contentCount: number;
  maxPrice: number;
  minPrice: number;
  averageRating: number;
  ratingCount: number;
  defaultCityId?: string;
  contents: ContentDocument[];
}
