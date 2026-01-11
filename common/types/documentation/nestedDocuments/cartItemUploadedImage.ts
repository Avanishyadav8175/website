// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type CustomizationImageDocument } from "@/common/types/documentation/media/customizationImage";
import { type ObjectId } from "mongoose";

// document
export interface CartItemUploadedImageDocument extends Document {
  label: string;
  images: string[] | ObjectId[] | CustomizationImageDocument[];
}
