// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";

// document
export interface CategoryCustomPermissionDocument extends Document {
  addon?: PermissionDocument;
  aiTag?: PermissionDocument;
  catalogue?: PermissionDocument;
  content?: PermissionDocument;
}
