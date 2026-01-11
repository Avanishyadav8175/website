// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type HomepageLayoutDocument,
  type HomepageLayoutModel
} from "@/common/types/documentation/pages/homepageLayout";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<HomepageLayoutDocument, HomepageLayoutModel>(
  MODELS.HomepageLayouts
);

export const handleGetHomepageLayouts = getDocuments();
export const handleGetHomepageLayout = getDocument();
export const handleAddHomepageLayouts = addDocuments();
export const handleUpdateHomepageLayout = updateDocument();
export const handleUpdateHomepageLayouts = updateDocuments();
export const handleDeleteHomepageLayout = deleteDocument();
export const handleDeleteHomepageLayouts = deleteDocuments();
