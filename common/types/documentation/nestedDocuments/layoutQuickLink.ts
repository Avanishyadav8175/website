// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type LinkDocument } from "@/common/types/documentation/nestedDocuments/link";

// document
export interface LayoutQuickLinkDocument extends Document {
  heading: string;
  links: LinkDocument[];
}
