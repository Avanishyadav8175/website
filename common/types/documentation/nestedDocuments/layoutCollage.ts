// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { ClickableImageDocument } from "./clickableImage";

// document
export interface LayoutCollageDocument extends Document {
  type:
    | "l4-m0-r1"
    | "l1-m0-r4"
    | "l2-m1-r2"
    | "lt1-lb2-rt1-rb2"
    | "lt2-lb1-rt2-rb1";
  images: ClickableImageDocument[];
}
