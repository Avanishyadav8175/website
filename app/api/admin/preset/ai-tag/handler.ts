// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type AITagDocument,
  type AITagModel
} from "@/common/types/documentation/presets/aiTag";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<AITagDocument, AITagModel>(MODELS.AITags);

export const handleGetAITags = getDocuments();
export const handleGetAITag = getDocument();
export const handleAddAITags = addDocuments();
export const handleUpdateAITag = updateDocument();
export const handleUpdateAITags = updateDocuments();
export const handleDeleteAITag = deleteDocument();
export const handleDeleteAITags = deleteDocuments();
