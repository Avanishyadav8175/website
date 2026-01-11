// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";

// document
export interface ContentCustomPermissionDocument extends Document {
  addon?: PermissionDocument;
  coupon?: PermissionDocument;
  product?: PermissionDocument;
  service?: PermissionDocument;
}
