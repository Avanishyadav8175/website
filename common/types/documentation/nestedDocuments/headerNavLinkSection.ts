// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type HeaderNavLinkSectionLinkDocument } from "@/common/types/documentation/nestedDocuments/headerNavLinkSectionLink";

// document
export interface HeaderNavLinkSectionDocument extends Document {
  heading: string;
  links: HeaderNavLinkSectionLinkDocument[];
}
