// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type CacheCustomPermissionDocument } from "@/common/types/documentation/nestedDocuments/cacheCustomPermission";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";

// document
export interface CachePermissionDocument extends Document {
  isCustomized: Boolean;
  all?: PermissionDocument;
  custom?: CacheCustomPermissionDocument;
}
