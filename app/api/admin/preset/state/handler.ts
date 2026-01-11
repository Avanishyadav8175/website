// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type StateDocument,
  type StateModel
} from "@/common/types/documentation/presets/state";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<StateDocument, StateModel>(MODELS.States);

export const handleGetStates = getDocuments();
export const handleGetState = getDocument();
export const handleAddStates = addDocuments();
export const handleUpdateState = updateDocument();
export const handleUpdateStates = updateDocuments();
export const handleDeleteState = deleteDocument();
export const handleDeleteStates = deleteDocuments();
