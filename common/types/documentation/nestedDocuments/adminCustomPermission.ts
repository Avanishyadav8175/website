// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";

// document
export interface AdminCustomPermissionDocument extends Document {
  adminRole?: PermissionDocument;
  admin?: PermissionDocument;
}
