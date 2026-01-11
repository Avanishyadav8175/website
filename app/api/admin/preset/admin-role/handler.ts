// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type AdminRoleDocument,
  type AdminRoleModel
} from "@/common/types/documentation/presets/adminRole";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<AdminRoleDocument, AdminRoleModel>(MODELS.AdminRoles);

export const handleGetAdminRoles = getDocuments();
export const handleGetAdminRole = getDocument();
export const handleAddAdminRoles = addDocuments();
export const handleUpdateAdminRole = updateDocument();
export const handleUpdateAdminRoles = updateDocuments();
export const handleDeleteAdminRole = deleteDocument();
export const handleDeleteAdminRoles = deleteDocuments();
