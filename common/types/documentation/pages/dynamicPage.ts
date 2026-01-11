// libraries
import { Model } from "mongoose";

// types
import { type PageDocument as Document } from "@/common/types/documentation/_document";
import { type DynamicPageLayoutDocument } from "@/common/types/documentation/nestedDocuments/dynamicPageLayout";
import { type SEOMetaDocument } from "@/common/types/documentation/nestedDocuments/seoMeta";

// document
export interface DynamicPageDocument extends Document {
  name: string;
  slug: string;
  layouts: DynamicPageLayoutDocument[];
  seoMeta: SEOMetaDocument;
  layoutCounter: number;
}

// model
export interface DynamicPageModel extends Model<DynamicPageDocument> {}
