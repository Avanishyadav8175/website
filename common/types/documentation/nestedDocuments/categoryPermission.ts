// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type CategoryCustomPermissionDocument } from "@/common/types/documentation/nestedDocuments/categoryCustomPermission";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";

// document
export interface CategoryPermissionDocument extends Document {
  isCustomized: Boolean;
  all?: PermissionDocument;
  custom?: CategoryCustomPermissionDocument;
}
