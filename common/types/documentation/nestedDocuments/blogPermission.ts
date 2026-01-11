// types
import { type BlogCustomPermissionDocument } from "./blogCustomPermission";
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";

// document
export interface BlogPermissionDocument extends Document {
  isCustomized: Boolean;
  all?: PermissionDocument;
  custom?: BlogCustomPermissionDocument;
}
