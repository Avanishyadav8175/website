// types
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";

export const unauthorizedPermission = {
  create: false,
  read: false,
  update: false,
  delete: false
} as PermissionDocument;
