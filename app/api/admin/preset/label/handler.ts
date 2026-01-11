// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type LabelDocument,
  type LabelModel
} from "@/common/types/documentation/presets/label";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<LabelDocument, LabelModel>(MODELS.Labels);

export const handleGetLabels = getDocuments();
export const handleGetLabel = getDocument();
export const handleAddLabels = addDocuments();
export const handleUpdateLabel = updateDocument();
export const handleUpdateLabels = updateDocuments();
export const handleDeleteLabel = deleteDocument();
export const handleDeleteLabels = deleteDocuments();
