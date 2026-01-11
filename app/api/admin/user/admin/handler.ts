// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type AdminDocument,
  type AdminModel
} from "@/common/types/documentation/users/admin";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  deleteDocument
} = getHandler<AdminDocument, AdminModel>(MODELS.Admins);

export const handleGetAdmins = getDocuments();
export const handleGetAdmin = getDocument();
export const handleAddAdmins = addDocuments();
export const handleUpdateAdmin = updateDocument({
  requestDataMiddleware: (admin) => {
    if ("isDeleted" in admin && admin.isDeleted === true) {
      admin.status = "inactive";
    }

    return admin;
  }
});
export const handleDeleteAdmin = deleteDocument();
