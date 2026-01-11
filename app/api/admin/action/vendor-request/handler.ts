// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type VendorRequestDocument,
  type VendorRequestModel
} from "@/common/types/documentation/actions/vendorRequest";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  deleteDocument
} = getHandler<VendorRequestDocument, VendorRequestModel>(
  MODELS.VendorRequests
);

export const handleGetVendorRequests = getDocuments();
export const handleGetVendorRequest = getDocument();
export const handleAddVendorRequests = addDocuments();
export const handleUpdateVendorRequest = updateDocument();
export const handleDeleteVendorRequest = deleteDocument();
