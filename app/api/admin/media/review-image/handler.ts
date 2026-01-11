// models
import MODELS from "@/db/mongoose/models";

// middlewares
import {
  deleteReviewImageMiddleware,
  deleteReviewImagesMiddleware,
  uploadReviewImageMiddleware
} from "@/app/api/admin/media/review-image/middleware";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type ReviewImageDocument,
  type ReviewImageModel
} from "@/common/types/documentation/media/reviewImage";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<ReviewImageDocument, ReviewImageModel>(MODELS.ReviewImages);

export const handleGetReviewImages = getDocuments();
export const handleGetReviewImage = getDocument();
export const handleAddReviewImages = addDocuments({
  requestDataMiddleware: uploadReviewImageMiddleware
});
export const handleUpdateReviewImage = updateDocument();
export const handleUpdateReviewImages = updateDocuments();
export const handleDeleteReviewImage = deleteDocument({
  responseDataMiddleware: deleteReviewImageMiddleware
});
export const handleDeleteReviewImages = deleteDocuments({
  responseDataMiddleware: deleteReviewImagesMiddleware
});
