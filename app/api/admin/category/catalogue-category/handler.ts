// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type CatalogueCategoryDocument,
  type CatalogueCategoryModel
} from "@/common/types/documentation/categories/catalogueCategory";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<CatalogueCategoryDocument, CatalogueCategoryModel>(
  MODELS.CatalogueCategories
);

export const handleGetCatalogueCategories = getDocuments();
export const handleGetCatalogueCategory = getDocument();
export const handleAddCatalogueCategories = addDocuments();
export const handleUpdateCatalogueCategory = updateDocument();
export const handleUpdateCatalogueCategories = updateDocuments();
export const handleDeleteCatalogueCategory = deleteDocument();
export const handleDeleteCatalogueCategories = deleteDocuments();
