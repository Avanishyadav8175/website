// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";
import { type PageCustomPermissionDocument } from "@/common/types/documentation/nestedDocuments/pageCustomPermission";

// document
export interface PagePermissionDocument extends Document {
  isCustomized: Boolean;
  all?: PermissionDocument;
  custom?: PageCustomPermissionDocument;
}
