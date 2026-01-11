// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type PageLayoutDocument } from "@/common/types/documentation/nestedDocuments/pageLayout";

// document
export interface DynamicPageLayoutDocument extends Document {
  order: number;
  type:
    | "banner"
    | "category"
    | "collage"
    | "content"
    | "text"
    | "faq"
    | "quick-link";
  title?: string;
  subtitle?: string;
  layout: PageLayoutDocument;
  leftAlign?: boolean;
  extraSpacing?: boolean;
  customBG?: string;
  isActive?: boolean;
  isDeleted?: boolean;
}
