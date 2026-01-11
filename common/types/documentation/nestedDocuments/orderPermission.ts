// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";
import { type OrderCustomPermissionDocument } from "@/common/types/documentation/nestedDocuments/orderCustomPermission";

// document
export interface OrderPermissionDocument extends Document {
  isCustomized: Boolean;
  all?: PermissionDocument;
  custom?: OrderCustomPermissionDocument;
}
