// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";

// document
export interface CustomerCustomPermissionDocument extends Document {
  customer?: PermissionDocument;
  lead?: PermissionDocument;
  callback?: PermissionDocument;
  issue?: PermissionDocument;
}
