// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type BlogArticleDocument,
  type BlogArticleModel
} from "@/common/types/documentation/blog/blogArticle";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<BlogArticleDocument, BlogArticleModel>(MODELS.BlogArticles);

export const handleGetBlogArticles = getDocuments();
export const handleGetBlogArticle = getDocument();
export const handleAddBlogArticles = addDocuments();
export const handleUpdateBlogArticle = updateDocument();
export const handleUpdateBlogArticles = updateDocuments();
export const handleDeleteBlogArticle = deleteDocument();
export const handleDeleteBlogArticles = deleteDocuments();
