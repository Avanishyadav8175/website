// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type BrandDocument,
  type BrandModel
} from "@/common/types/documentation/presets/brand";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<BrandDocument, BrandModel>(MODELS.Brands);

export const handleGetBrands = getDocuments();
export const handleGetBrand = getDocument();
export const handleAddBrands = addDocuments();
export const handleUpdateBrand = updateDocument();
export const handleUpdateBrands = updateDocuments();
export const handleDeleteBrand = deleteDocument();
export const handleDeleteBrands = deleteDocuments();
