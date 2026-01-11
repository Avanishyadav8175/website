// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type FAQGroupDocument,
  type FAQGroupModel
} from "@/common/types/documentation/presets/faqGroup";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<FAQGroupDocument, FAQGroupModel>(MODELS.FAQGroups);

export const handleGetFAQGroups = getDocuments();
export const handleGetFAQGroup = getDocument();
export const handleAddFAQGroups = addDocuments();
export const handleUpdateFAQGroup = updateDocument();
export const handleUpdateFAQGroups = updateDocuments();
export const handleDeleteFAQGroup = deleteDocument();
export const handleDeleteFAQGroups = deleteDocuments();
