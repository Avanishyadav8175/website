// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type TrendingSearchKeywordDocument,
  type TrendingSearchKeywordModel
} from "@/common/types/documentation/presets/trendingSearchKeyword";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<TrendingSearchKeywordDocument, TrendingSearchKeywordModel>(
  MODELS.TrendingSearchKeywords
);

export const handleGetTrendingSearchKeywords = getDocuments();
export const handleGetTrendingSearchKeyword = getDocument();
export const handleAddTrendingSearchKeywords = addDocuments();
export const handleUpdateTrendingSearchKeyword = updateDocument();
export const handleUpdateTrendingSearchKeywords = updateDocuments();
export const handleDeleteTrendingSearchKeyword = deleteDocument();
export const handleDeleteTrendingSearchKeywords = deleteDocuments();
