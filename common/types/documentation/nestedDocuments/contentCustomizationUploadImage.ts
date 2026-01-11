// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type LabelDocument } from "../presets/label";
import { type ObjectId } from "mongoose";

// document
export interface ContentCustomizationUploadImageDocument extends Document {
  label: string | ObjectId | LabelDocument;
  imageLimit?: number;
}
