// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type MediaCustomPermissionDocument } from "@/common/types/documentation/nestedDocuments/mediaCustomPermission";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";

// document
export interface MediaPermissionDocument extends Document {
  isCustomized: Boolean;
  all?: PermissionDocument;
  custom?: MediaCustomPermissionDocument;
}
