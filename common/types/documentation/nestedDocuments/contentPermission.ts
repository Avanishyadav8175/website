// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { ContentCustomPermissionDocument } from "@/common/types/documentation/nestedDocuments/contentCustomPermission";
import { PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";

// document
export interface ContentPermissionDocument extends Document {
  isCustomized: Boolean;
  all?: PermissionDocument;
  custom?: ContentCustomPermissionDocument;
}
