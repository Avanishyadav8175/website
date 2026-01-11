// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type HeaderNavLinkDocument,
  type HeaderNavLinkModel
} from "@/common/types/documentation/pages/headerNavLink";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  swapDocumentsOrder,
  deleteDocument
} = getHandler<HeaderNavLinkDocument, HeaderNavLinkModel>(
  MODELS.HeaderNavLinks
);

export const handleGetHeaderNavLinks = getDocuments();
export const handleGetHeaderNavLink = getDocument();
export const handleAddHeaderNavLinks = addDocuments();
export const handleUpdateHeaderNavLink = updateDocument();
export const handleSwapHeaderNavLinksOrder = swapDocumentsOrder();
export const handleDeleteHeaderNavLink = deleteDocument();
