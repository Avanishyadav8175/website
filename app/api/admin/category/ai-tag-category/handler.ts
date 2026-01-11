// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type AITagCategoryDocument,
  type AITagCategoryModel
} from "@/common/types/documentation/categories/aiTagCategory";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<AITagCategoryDocument, AITagCategoryModel>(
  MODELS.AITagCategories
);

export const handleGetAITagCategories = getDocuments();
export const handleGetAITagCategory = getDocument();
export const handleAddAITagCategories = addDocuments();
export const handleUpdateAITagCategory = updateDocument();
export const handleUpdateAITagCategories = updateDocuments();
export const handleDeleteAITagCategory = deleteDocument();
export const handleDeleteAITagCategories = deleteDocuments();
