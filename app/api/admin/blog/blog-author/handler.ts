// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type BlogAuthorDocument,
  type BlogAuthorModel
} from "@/common/types/documentation/blog/blogAuthor";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<BlogAuthorDocument, BlogAuthorModel>(MODELS.BlogAuthors);

export const handleGetBlogAuthors = getDocuments();
export const handleGetBlogAuthor = getDocument();
export const handleAddBlogAuthors = addDocuments();
export const handleUpdateBlogAuthor = updateDocument();
export const handleUpdateBlogAuthors = updateDocuments();
export const handleDeleteBlogAuthor = deleteDocument();
export const handleDeleteBlogAuthors = deleteDocuments();
