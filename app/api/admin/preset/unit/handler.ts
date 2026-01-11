// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type UnitDocument,
  type UnitModel
} from "@/common/types/documentation/presets/unit";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<UnitDocument, UnitModel>(MODELS.Units);

export const handleGetUnits = getDocuments();
export const handleGetUnit = getDocument();
export const handleAddUnits = addDocuments();
export const handleUpdateUnit = updateDocument();
export const handleUpdateUnits = updateDocuments();
export const handleDeleteUnit = deleteDocument();
export const handleDeleteUnits = deleteDocuments();
