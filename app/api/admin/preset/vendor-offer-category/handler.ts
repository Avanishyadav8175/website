// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type VendorOfferCategoryDocument,
  type VendorOfferCategoryModel
} from "@/common/types/documentation/presets/vendorOfferCategory";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<VendorOfferCategoryDocument, VendorOfferCategoryModel>(
  MODELS.VendorOfferCategories
);

export const handleGetVendorOfferCategories = getDocuments();
export const handleGetVendorOfferCategory = getDocument();
export const handleAddVendorOfferCategories = addDocuments();
export const handleUpdateVendorOfferCategory = updateDocument();
export const handleUpdateVendorOfferCategories = updateDocuments();
export const handleDeleteVendorOfferCategory = deleteDocument();
export const handleDeleteVendorOfferCategories = deleteDocuments();
