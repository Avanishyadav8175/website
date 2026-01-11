// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";

// document
export interface OrderCustomPermissionDocument extends Document {
  new?: PermissionDocument;
  inProgress?: PermissionDocument;
  delivered?: PermissionDocument;
  failed?: PermissionDocument;
  cancelled?: PermissionDocument;
  delivery?: PermissionDocument;
  deliveryCancellationRequest?: PermissionDocument;
}
