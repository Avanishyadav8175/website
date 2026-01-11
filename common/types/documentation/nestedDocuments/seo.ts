// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type QADocument } from "@/common/types/documentation/nestedDocuments/qa";
import { type SEOMetaDocument } from "@/common/types/documentation/nestedDocuments/seoMeta";
// import { type SEOSchemaDocument } from "@/common/types/documentation/nestedDocuments/seoSchema";

// document
export interface SEODocument extends Document {
  // seoSchema: SEOSchemaDocument;
  meta: SEOMetaDocument;
  faqs: QADocument[];
}
