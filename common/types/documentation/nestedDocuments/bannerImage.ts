// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { type ObjectId } from "mongoose";

// document
export interface BannerImageDocument extends Document {
  desktop: string | ObjectId | ImageDocument;
  mobile: string | ObjectId | ImageDocument;
  path?: string;
}
