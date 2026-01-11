// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type GSTDocument,
  type GSTModel
} from "@/common/types/documentation/presets/gst";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<GSTDocument, GSTModel>(MODELS.GSTs);

export const handleGetGSTs = getDocuments();
export const handleGetGST = getDocument();
export const handleAddGSTs = addDocuments();
export const handleUpdateGST = updateDocument();
export const handleUpdateGSTs = updateDocuments();
export const handleDeleteGST = deleteDocument();
export const handleDeleteGSTs = deleteDocuments();
