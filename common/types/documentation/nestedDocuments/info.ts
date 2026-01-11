// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";

// document
export interface InfoDocument extends Document {
  openIn: "_blank" | "_self";
  heading: string;
  topContent?: string;
  bottomContent?: string;
}
