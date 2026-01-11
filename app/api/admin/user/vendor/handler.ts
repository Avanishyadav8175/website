// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type VendorDocument,
  type VendorModel
} from "@/common/types/documentation/users/vendor";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  deleteDocument
} = getHandler<VendorDocument, VendorModel>(MODELS.Vendors);

export const handleGetVendors = getDocuments();
export const handleGetVendor = getDocument();
export const handleAddVendors = addDocuments();
export const handleUpdateVendor = updateDocument();
export const handleDeleteVendor = deleteDocument();
