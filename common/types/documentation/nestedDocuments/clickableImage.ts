// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { type ObjectId } from "mongoose";

// document
export interface ClickableImageDocument extends Document {
  label?: string;
  path: string;
  image?: string | ObjectId | ImageDocument;
}
