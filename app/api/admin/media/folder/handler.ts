// models
import MODELS from "@/db/mongoose/models";

// middlewares
import {
  createFolderMiddleware,
  deleteFolderMiddleware,
  generateFolderNameMiddleware
} from "@/app/api/admin/media/folder/middleware";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type FolderDocument,
  type FolderModel
} from "@/common/types/documentation/media/folder";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  deleteDocument
} = getHandler<FolderDocument, FolderModel>(MODELS.Folders);

export const handleGetFolders = getDocuments();
export const handleGetFolder = getDocument();
export const handleAddFolders = addDocuments({
  requestDataMiddleware: generateFolderNameMiddleware,
  responseDataMiddleware: createFolderMiddleware
});
export const handleUpdateFolder = updateDocument();
export const handleDeleteFolder = deleteDocument({
  responseDataMiddleware: deleteFolderMiddleware
});
