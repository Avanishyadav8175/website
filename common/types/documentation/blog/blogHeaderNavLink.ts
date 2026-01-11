// libraries
import { Model } from "mongoose";

// types
import { type PageDocument as Document } from "@/common/types/documentation/_document";
import { type HeaderNavLinkSectionDocument } from "@/common/types/documentation/nestedDocuments/headerNavLinkSection";

// document
export interface BlogHeaderNavLinkDocument extends Document {
  order: number;
  label: string;
  path?: string;
  sections?: HeaderNavLinkSectionDocument[];
}

// model
export interface BlogHeaderNavLinkModel
  extends Model<BlogHeaderNavLinkDocument> {}
