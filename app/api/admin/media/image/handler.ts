import MODELS from "@/db/mongoose/models";
import {
  deleteImageMiddleware,
  deleteImagesMiddleware,
  uploadImageMiddleware
} from "@/app/api/admin/media/image/middleware";
import getHandler from "@/common/utils/api/getHandler";
import {
  type ImageDocument,
  type ImageModel
} from "@/common/types/documentation/media/image";

const { getDocuments, getDocument, addDocuments, updateDocument, updateDocuments, deleteDocument, deleteDocuments }
  = getHandler<ImageDocument, ImageModel>(MODELS.Images);

export const handleGetImages = getDocuments();
export const handleGetImage = getDocument();
export const handleAddImages = addDocuments({
  requestDataMiddleware: uploadImageMiddleware
});
export const handleUpdateImage = updateDocument();
export const handleUpdateImages = updateDocuments();
export const handleDeleteImage = deleteDocument({
  responseDataMiddleware: deleteImageMiddleware
});
export const handleDeleteImages = deleteDocuments({
  responseDataMiddleware: deleteImagesMiddleware
});
