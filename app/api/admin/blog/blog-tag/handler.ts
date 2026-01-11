// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type BlogTagDocument,
  type BlogTagModel
} from "@/common/types/documentation/blog/blogTag";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<BlogTagDocument, BlogTagModel>(MODELS.BlogTags);

export const handleGetBlogTags = getDocuments();
export const handleGetBlogTag = getDocument();
export const handleAddBlogTags = addDocuments();
export const handleUpdateBlogTag = updateDocument();
export const handleUpdateBlogTags = updateDocuments();
export const handleDeleteBlogTag = deleteDocument();
export const handleDeleteBlogTags = deleteDocuments();
