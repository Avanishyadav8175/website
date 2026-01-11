// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type PromotionTagDocument,
  type PromotionTagModel
} from "@/common/types/documentation/presets/promotionTag";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<PromotionTagDocument, PromotionTagModel>(MODELS.PromotionTags);

export const handleGetPromotionTags = getDocuments();
export const handleGetPromotionTag = getDocument();
export const handleAddPromotionTags = addDocuments();
export const handleUpdatePromotionTag = updateDocument();
export const handleUpdatePromotionTags = updateDocuments();
export const handleDeletePromotionTag = deleteDocument();
export const handleDeletePromotionTags = deleteDocuments();
