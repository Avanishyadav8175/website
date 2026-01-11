// libraries
import { Model } from "mongoose";

// types
import { type PresetDocument } from "@/common/types/documentation/_document";
import { type AdminRolePermissionDocument } from "@/common/types/documentation/nestedDocuments/adminRolePermission";

// document
export interface AdminRoleDocument extends PresetDocument {
  label: string;
  permission: AdminRolePermissionDocument;
}

// model
export interface AdminRoleModel extends Model<AdminRoleDocument> {}
