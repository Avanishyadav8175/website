// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type CatalogueDocument,
  type CatalogueModel
} from "@/common/types/documentation/presets/catalogue";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<CatalogueDocument, CatalogueModel>(MODELS.Catalogues);

export const handleGetCatalogues = getDocuments();
export const handleGetCatalogue = getDocument();
export const handleAddCatalogues = addDocuments();
export const handleUpdateCatalogue = updateDocument();
export const handleUpdateCatalogues = updateDocuments();
export const handleDeleteCatalogue = deleteDocument();
export const handleDeleteCatalogues = deleteDocuments();
