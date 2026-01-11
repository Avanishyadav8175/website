// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type BlogLayoutDocument } from "@/common/types/documentation/nestedDocuments/blogLayout";

// document
export interface BlogLayoutItemDocument extends Document {
  order: number;
  type: "content" | "faq" | "image" | "text" | "video";
  layout: BlogLayoutDocument;
  isActive: boolean;
  isDeleted: boolean;
}
