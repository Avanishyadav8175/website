// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";

// document
export interface PageCustomPermissionDocument extends Document {
  header?: PermissionDocument;
  footer?: PermissionDocument;
  homepage?: PermissionDocument;
  dynamicPage?: PermissionDocument;
  topicPage?: PermissionDocument;
  subTopicPage?: PermissionDocument;
}
