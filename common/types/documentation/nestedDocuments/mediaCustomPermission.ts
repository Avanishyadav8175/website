// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";

// document
export interface MediaCustomPermissionDocument extends Document {
  folder?: PermissionDocument;
  image?: PermissionDocument;
  customizationImage?: PermissionDocument;
  identificationImage?: PermissionDocument;
  issueImage?: PermissionDocument;
  reviewImage?: PermissionDocument;
}
