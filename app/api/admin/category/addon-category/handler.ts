// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type AddonCategoryDocument,
  type AddonCategoryModel
} from "@/common/types/documentation/categories/addonCategory";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<AddonCategoryDocument, AddonCategoryModel>(
  MODELS.AddonCategories
);

export const handleGetAddonCategories = getDocuments();
export const handleGetAddonCategory = getDocument();
export const handleAddAddonCategories = addDocuments();
export const handleUpdateAddonCategory = updateDocument();
export const handleUpdateAddonCategories = updateDocuments();
export const handleDeleteAddonCategory = deleteDocument();
export const handleDeleteAddonCategories = deleteDocuments();
