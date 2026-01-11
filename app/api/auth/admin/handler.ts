import MODELS from "@/db/mongoose/models";
import getAuthHandler from "@/common/utils/api/getAuthHandler";
import { type AdminDocument, type AdminModel } from "@/common/types/documentation/users/admin";

const checkStatus = (admin: AdminDocument) => admin.status === "active" ? admin : null;

const { register, login, validate, logout } =
  getAuthHandler<AdminDocument, AdminModel>({ Model: MODELS.Admins, cookieName: "__admin_auth__" });

export const handleAdminRegister = register();
export const handleAdminLogin = login({ responseDataMiddleware: checkStatus });
export const handleAdminValidate = validate({ responseDataMiddleware: checkStatus });
export const handleAdminLogout = logout();
