// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";
import { type SettingCustomPermissionDocument } from "@/common/types/documentation/nestedDocuments/settingCustomPermission";

// document
export interface SettingPermissionDocument extends Document {
  isCustomized: Boolean;
  all?: PermissionDocument;
  custom?: SettingCustomPermissionDocument;
}
