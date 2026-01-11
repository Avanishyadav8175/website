// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type ProcessingTimeDocument,
  type ProcessingTimeModel
} from "@/common/types/documentation/presets/processingTime";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<ProcessingTimeDocument, ProcessingTimeModel>(
  MODELS.ProcessingTimes
);

export const handleGetProcessingTimes = getDocuments();
export const handleGetProcessingTime = getDocument();
export const handleAddProcessingTimes = addDocuments();
export const handleUpdateProcessingTime = updateDocument();
export const handleUpdateProcessingTimes = updateDocuments();
export const handleDeleteProcessingTime = deleteDocument();
export const handleDeleteProcessingTimes = deleteDocuments();
