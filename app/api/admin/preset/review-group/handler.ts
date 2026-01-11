// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type ReviewGroupDocument,
  type ReviewGroupModel
} from "@/common/types/documentation/presets/reviewGroup";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<ReviewGroupDocument, ReviewGroupModel>(MODELS.ReviewGroups);

export const handleGetReviewGroups = getDocuments();
export const handleGetReviewGroup = getDocument();
export const handleAddReviewGroups = addDocuments();
export const handleUpdateReviewGroup = updateDocument();
export const handleUpdateReviewGroups = updateDocuments();
export const handleDeleteReviewGroup = deleteDocument();
export const handleDeleteReviewGroups = deleteDocuments();
