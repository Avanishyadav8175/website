// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type ColorDocument,
  type ColorModel
} from "@/common/types/documentation/presets/color";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<ColorDocument, ColorModel>(MODELS.Colors);

export const handleGetColors = getDocuments();
export const handleGetColor = getDocument();
export const handleAddColors = addDocuments();
export const handleUpdateColor = updateDocument();
export const handleUpdateColors = updateDocuments();
export const handleDeleteColor = deleteDocument();
export const handleDeleteColors = deleteDocuments();
