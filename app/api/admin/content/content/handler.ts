// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type ContentDocument,
  type ContentModel
} from "@/common/types/documentation/contents/content";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<ContentDocument, ContentModel>(MODELS.Contents);

export const handleGetContents = getDocuments();
export const handleGetContent = getDocument();
export const handleAddContents = addDocuments();
export const handleUpdateContent = updateDocument();
export const handleUpdateContents = updateDocuments();
export const handleDeleteContent = deleteDocument();
export const handleDeleteContents = deleteDocuments();
