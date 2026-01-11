// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type SearchTagDocument,
  type SearchTagModel
} from "@/common/types/documentation/presets/searchTag";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<SearchTagDocument, SearchTagModel>(MODELS.SearchTags);

export const handleGetSearchTags = getDocuments();
export const handleGetSearchTag = getDocument();
export const handleAddSearchTags = addDocuments();
export const handleUpdateSearchTag = updateDocument();
export const handleUpdateSearchTags = updateDocuments();
export const handleDeleteSearchTag = deleteDocument();
export const handleDeleteSearchTags = deleteDocuments();
