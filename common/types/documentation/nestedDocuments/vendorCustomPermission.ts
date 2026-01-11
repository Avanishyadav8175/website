// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";

// document
export interface VendorCustomPermissionDocument extends Document {
  request?: PermissionDocument;
  vendor?: PermissionDocument;
}
