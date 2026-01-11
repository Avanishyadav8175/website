// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type VendorContactSocialDocument } from "@/common/types/documentation/nestedDocuments/vendorContactSocial";

// document
export interface VendorContactDocument extends Document {
  mobile: string;
  alternativeMobile?: string;
  whatsapp: string;
  mail: string;
  website?: string;
  social?: VendorContactSocialDocument;
}
