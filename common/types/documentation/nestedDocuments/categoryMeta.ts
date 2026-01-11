// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type SEOMetaDocument } from "@/common/types/documentation/nestedDocuments/seoMeta";

// document
export interface CategoryMetaDocument extends Document {
  path: string;
  meta: SEOMetaDocument;
  images: string[];
}
