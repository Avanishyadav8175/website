// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";

// document
export interface VendorContactSocialDocument extends Document {
  facebook?: string;
  instagram?: string;
  youtube?: string;
}
