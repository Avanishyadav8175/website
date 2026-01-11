// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type BlogCategoryDocument,
  type BlogCategoryModel
} from "@/common/types/documentation/blog/blogCategory";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<BlogCategoryDocument, BlogCategoryModel>(MODELS.BlogCategories);

export const handleGetBlogCategories = getDocuments();
export const handleGetBlogCategory = getDocument();
export const handleAddBlogCategories = addDocuments();
export const handleUpdateBlogCategory = updateDocument();
export const handleUpdateBlogCategories = updateDocuments();
export const handleDeleteBlogCategory = deleteDocument();
export const handleDeleteBlogCategories = deleteDocuments();
