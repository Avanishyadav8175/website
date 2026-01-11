// models
import MODELS from "@/db/mongoose/models";

// middlewares
import {
  deleteIdentificationImageMiddleware,
  deleteIdentificationImagesMiddleware,
  uploadIdentificationImageMiddleware
} from "@/app/api/admin/media/identification-image/middleware";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type IdentificationImageDocument,
  type IdentificationImageModel
} from "@/common/types/documentation/media/identificationImage";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<IdentificationImageDocument, IdentificationImageModel>(
  MODELS.IdentificationImages
);

export const handleGetIdentificationImages = getDocuments();
export const handleGetIdentificationImage = getDocument();
export const handleAddIdentificationImages = addDocuments({
  requestDataMiddleware: uploadIdentificationImageMiddleware
});
export const handleUpdateIdentificationImage = updateDocument();
export const handleUpdateIdentificationImages = updateDocuments();
export const handleDeleteIdentificationImage = deleteDocument({
  responseDataMiddleware: deleteIdentificationImageMiddleware
});
export const handleDeleteIdentificationImages = deleteDocuments({
  responseDataMiddleware: deleteIdentificationImagesMiddleware
});
