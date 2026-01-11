// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";

// document
export interface EdibleDocument extends Document {
  isEdible: boolean;
  type?: "unspecified" | "veg" | "non-veg";
}
