// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";
import { type SellerCustomPermissionDocument } from "@/common/types/documentation/nestedDocuments/sellerCustomPermission";

// document
export interface SellerPermissionDocument extends Document {
  isCustomized: Boolean;
  all?: PermissionDocument;
  custom?: SellerCustomPermissionDocument;
}
