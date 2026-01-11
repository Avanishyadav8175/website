// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type CustomerCustomPermissionDocument } from "@/common/types/documentation/nestedDocuments/customerCustomPermission";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";

// document
export interface CustomerPermissionDocument extends Document {
  isCustomized: Boolean;
  all?: PermissionDocument;
  custom?: CustomerCustomPermissionDocument;
}
