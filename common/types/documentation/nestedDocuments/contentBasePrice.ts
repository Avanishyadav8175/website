// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";

// document
export interface ContentBasePriceDocument extends Document {
  mrp: number;
  price: number;
}
