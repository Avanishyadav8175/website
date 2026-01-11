// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";
import { type VendorCustomPermissionDocument } from "@/common/types/documentation/nestedDocuments/vendorCustomPermission";

// document
export interface VendorPermissionDocument extends Document {
  isCustomized: Boolean;
  all?: PermissionDocument;
  custom?: VendorCustomPermissionDocument;
}
