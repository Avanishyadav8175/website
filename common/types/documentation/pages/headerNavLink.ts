// libraries
import { Model } from "mongoose";

// types
import { type PageDocument as Document } from "@/common/types/documentation/_document";
import { type ClickableImageDocument } from "../nestedDocuments/clickableImage";
import { type HeaderNavLinkSectionDocument } from "@/common/types/documentation/nestedDocuments/headerNavLinkSection";

// document
export interface HeaderNavLinkDocument extends Document {
  order: number;
  label: string;
  path?: string;
  sections?: HeaderNavLinkSectionDocument[];
  quickLinks?: ClickableImageDocument[];
}

// model
export interface HeaderNavLinkModel extends Model<HeaderNavLinkDocument> {}
