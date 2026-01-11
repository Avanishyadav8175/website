// libraries
import { Model } from "mongoose";

// types
import { type PageDocument as Document } from "@/common/types/documentation/_document";
import { type FooterSectionLinkDocument } from "@/common/types/documentation/nestedDocuments/footerSectionLink";

// document
export interface BlogFooterSectionDocument extends Document {
  order: number;
  heading: string;
  path?: string;
  links?: FooterSectionLinkDocument[];
}

// model
export interface BlogFooterSectionModel
  extends Model<BlogFooterSectionDocument> {}
