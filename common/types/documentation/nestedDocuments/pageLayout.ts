// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type BannerDocument } from "@/common/types/documentation/nestedDocuments/banner";
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type LayoutCategoryDocument } from "@/common/types/documentation/nestedDocuments/layoutCategory";
import { type LayoutCollageDocument } from "@/common/types/documentation/nestedDocuments/layoutCollage";
import { type LayoutQuickLinkDocument } from "@/common/types/documentation/nestedDocuments/layoutQuickLink";
import { type ObjectId } from "mongoose";
import { type QADocument } from "@/common/types/documentation/nestedDocuments/qa";

// document
export interface PageLayoutDocument extends Document {
  banner?: BannerDocument;
  collage?: LayoutCollageDocument;
  content?: string[] | ObjectId[] | ContentDocument[];
  category?: LayoutCategoryDocument;
  text?: String;
  faq?: QADocument[];
  quickLink?: LayoutQuickLinkDocument[];
}
