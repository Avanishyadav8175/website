// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type BannerImageDocument } from "@/common/types/documentation/nestedDocuments/bannerImage";

// document
export interface BannerDocument extends Document {
  type?: "default" | "mini" | "micro" | "large" | "square";
  autoScroll: boolean;
  scrollInterval: number;
  loopInfinitely: boolean;
  showIndicators: boolean;
  images: BannerImageDocument[];
}
