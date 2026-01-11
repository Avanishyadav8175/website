// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type BannerDocument } from "@/common/types/documentation/nestedDocuments/banner";
import { type ClickableImageDocument } from "@/common/types/documentation/nestedDocuments/clickableImage";

// document
export interface TopicMediaDocument extends Document {
  banner?: BannerDocument;
  quickLinks?: ClickableImageDocument[];
}
