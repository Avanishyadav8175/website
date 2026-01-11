// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";
import { type PresetCustomPermissionDocument } from "@/common/types/documentation/nestedDocuments/presetCustomPermission";

// document
export interface PresetPermissionDocument extends Document {
  isCustomized: Boolean;
  all?: PermissionDocument;
  custom?: PresetCustomPermissionDocument;
}
