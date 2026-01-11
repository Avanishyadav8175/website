// models
import MODELS from "@/db/mongoose/models";

// middlewares
import {
  deleteIssueImageMiddleware,
  deleteIssueImagesMiddleware,
  uploadIssueImageMiddleware
} from "@/app/api/admin/media/issue-image/middleware";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type IssueImageDocument,
  type IssueImageModel
} from "@/common/types/documentation/media/issueImage";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<IssueImageDocument, IssueImageModel>(MODELS.IssueImages);

export const handleGetIssueImages = getDocuments();
export const handleGetIssueImage = getDocument();
export const handleAddIssueImages = addDocuments({
  requestDataMiddleware: uploadIssueImageMiddleware
});
export const handleUpdateIssueImage = updateDocument();
export const handleUpdateIssueImages = updateDocuments();
export const handleDeleteIssueImage = deleteDocument({
  responseDataMiddleware: deleteIssueImageMiddleware
});
export const handleDeleteIssueImages = deleteDocuments({
  responseDataMiddleware: deleteIssueImagesMiddleware
});
