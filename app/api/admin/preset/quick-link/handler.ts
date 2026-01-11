// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type QuickLinkDocument,
  type QuickLinkModel
} from "@/common/types/documentation/presets/quickLink";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<QuickLinkDocument, QuickLinkModel>(MODELS.QuickLinks);

export const handleGetQuickLinks = getDocuments();
export const handleGetQuickLink = getDocument();
export const handleAddQuickLinks = addDocuments();
export const handleUpdateQuickLink = updateDocument();
export const handleUpdateQuickLinks = updateDocuments();
export const handleDeleteQuickLink = deleteDocument();
export const handleDeleteQuickLinks = deleteDocuments();
