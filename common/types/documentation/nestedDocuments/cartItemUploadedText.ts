// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";

// document
export interface CartItemUploadedTextDocument extends Document {
  label: string;
  text: string;
}
