// types
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";

export const superAdminPermission = {
  create: true,
  read: true,
  update: true,
  delete: true
} as PermissionDocument;
