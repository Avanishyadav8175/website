// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";

// document
export interface SEOMetaDocument extends Document {
  title: string;
  tags: string[];
  description: string;
}
