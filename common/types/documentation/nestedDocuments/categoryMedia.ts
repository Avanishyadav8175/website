// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type BannerDocument } from "@/common/types/documentation/nestedDocuments/banner";
import { type ClickableImageDocument } from "./clickableImage";
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { type ObjectId } from "mongoose";

// document
export interface CategoryMediaDocument extends Document {
  icon: string | ObjectId | ImageDocument;
  banner?: BannerDocument;
  quickLinks?: ClickableImageDocument[];
}
