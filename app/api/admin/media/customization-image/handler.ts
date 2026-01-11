// models
import MODELS from "@/db/mongoose/models";

// middlewares
import {
  deleteCustomizationImageMiddleware,
  deleteCustomizationImagesMiddleware,
  uploadCustomizationImageMiddleware
} from "@/app/api/admin/media/customization-image/middleware";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type CustomizationImageDocument,
  type CustomizationImageModel
} from "@/common/types/documentation/media/customizationImage";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<CustomizationImageDocument, CustomizationImageModel>(
  MODELS.CustomizationImages
);

export const handleGetCustomizationImages = getDocuments();
export const handleGetCustomizationImage = getDocument();
export const handleAddCustomizationImages = addDocuments({
  requestDataMiddleware: uploadCustomizationImageMiddleware
});
export const handleUpdateCustomizationImage = updateDocument();
export const handleUpdateCustomizationImages = updateDocuments();
export const handleDeleteCustomizationImage = deleteDocument({
  responseDataMiddleware: deleteCustomizationImageMiddleware
});
export const handleDeleteCustomizationImages = deleteDocuments({
  responseDataMiddleware: deleteCustomizationImagesMiddleware
});
