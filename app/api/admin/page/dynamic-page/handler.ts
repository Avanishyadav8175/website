// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type DynamicPageDocument,
  type DynamicPageModel
} from "@/common/types/documentation/pages/dynamicPage";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  deleteDocument
} = getHandler<DynamicPageDocument, DynamicPageModel>(MODELS.DynamicPages);

export const handleGetDynamicPages = getDocuments();
export const handleGetDynamicPage = getDocument();
export const handleAddDynamicPages = addDocuments();
export const handleUpdateDynamicPage = updateDocument();
export const handleDeleteDynamicPage = deleteDocument();
