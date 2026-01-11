// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";

// document
export interface SettingCustomPermissionDocument extends Document {
  auth?: PermissionDocument;
  payment?: PermissionDocument;
  callback?: PermissionDocument;
  contact?: PermissionDocument;
  icon?: PermissionDocument;
  logo?: PermissionDocument;
  serviceImage?: PermissionDocument;
  social?: PermissionDocument;
}
