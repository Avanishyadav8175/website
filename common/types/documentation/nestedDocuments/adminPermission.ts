// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";
import { type AdminCustomPermissionDocument } from "@/common/types/documentation/nestedDocuments/adminCustomPermission";

// document
export interface AdminPermissionDocument extends Document {
  isCustomized: Boolean;
  all?: PermissionDocument;
  custom?: AdminCustomPermissionDocument;
}
