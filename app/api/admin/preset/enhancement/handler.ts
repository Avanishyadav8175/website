// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type EnhancementDocument,
  type EnhancementModel
} from "@/common/types/documentation/presets/enhancement";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<EnhancementDocument, EnhancementModel>(MODELS.Enhancements);

export const handleGetEnhancements = getDocuments();
export const handleGetEnhancement = getDocument();
export const handleAddEnhancements = addDocuments();
export const handleUpdateEnhancement = updateDocument();
export const handleUpdateEnhancements = updateDocuments();
export const handleDeleteEnhancement = deleteDocument();
export const handleDeleteEnhancements = deleteDocuments();
