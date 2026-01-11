// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { ClickableImageDocument } from "./clickableImage";

// document
export interface LayoutCategoryDocument extends Document {
  shape: "circle" | "square";
  columns: 2 | 3 | 4 | 5 | 6;
  images: ClickableImageDocument[];
  scrollable?: boolean;
}
