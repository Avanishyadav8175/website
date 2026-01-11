// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type ReviewDocument,
  type ReviewModel
} from "@/common/types/documentation/dynamic/review";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  deleteDocument
} = getHandler<ReviewDocument, ReviewModel>(MODELS.Reviews);

export const handleGetReviews = getDocuments();
export const handleGetReview = getDocument();
export const handleAddReviews = addDocuments();
export const handleUpdateReview = updateDocument();
export const handleDeleteReview = deleteDocument();
