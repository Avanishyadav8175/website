// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type FooterSectionDocument,
  type FooterSectionModel
} from "@/common/types/documentation/pages/footerSection";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  swapDocumentsOrder,
  deleteDocument
} = getHandler<FooterSectionDocument, FooterSectionModel>(
  MODELS.FooterSections
);

export const handleGetFooterSections = getDocuments();
export const handleGetFooterSection = getDocument();
export const handleAddFooterSections = addDocuments();
export const handleUpdateFooterSection = updateDocument();
export const handleSwapFooterSectionsOrder = swapDocumentsOrder();
export const handleDeleteFooterSection = deleteDocument();
