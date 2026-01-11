// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type ContentCategoryDocument,
  type ContentCategoryModel
} from "@/common/types/documentation/categories/contentCategory";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<ContentCategoryDocument, ContentCategoryModel>(
  MODELS.ContentCategories
);

export const handleGetContentCategories = getDocuments();
export const handleGetContentCategory = getDocument();
export const handleAddContentCategories = addDocuments();
export const handleUpdateContentCategory = updateDocument();
export const handleUpdateContentCategories = updateDocuments();
export const handleDeleteContentCategory = deleteDocument();
export const handleDeleteContentCategories = deleteDocuments();
