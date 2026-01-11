// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type FranchiseCustomPermissionDocument } from "@/common/types/documentation/nestedDocuments/franchiseCustomPermission";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";

// document
export interface FranchisePermissionDocument extends Document {
  isCustomized: Boolean;
  all?: PermissionDocument;
  custom?: FranchiseCustomPermissionDocument;
}
