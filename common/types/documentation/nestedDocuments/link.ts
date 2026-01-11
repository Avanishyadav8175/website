// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";

// document
export interface LinkDocument extends Document {
  label: string;
  path: string;
}
