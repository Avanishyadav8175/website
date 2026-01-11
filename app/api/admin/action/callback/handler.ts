// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type CallbackDocument,
  type CallbackModel
} from "@/common/types/documentation/actions/callback";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  deleteDocument
} = getHandler<CallbackDocument, CallbackModel>(MODELS.Callbacks);

export const handleGetCallbacks = getDocuments();
export const handleGetCallback = getDocument();
export const handleAddCallbacks = addDocuments();
export const handleUpdateCallback = updateDocument();
export const handleDeleteCallback = deleteDocument();
