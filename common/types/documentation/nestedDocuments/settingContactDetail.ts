// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { type ObjectId } from "mongoose";

// document
export interface SettingContactDetailDocument extends Document {
  label: string;
  contact: string;
  icon?: string | ObjectId | ImageDocument;
  description?: string;
}
