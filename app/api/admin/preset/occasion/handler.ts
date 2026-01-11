// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type OccasionDocument,
  type OccasionModel
} from "@/common/types/documentation/presets/occasion";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<OccasionDocument, OccasionModel>(MODELS.Occasions);

export const handleGetOccasions = getDocuments();
export const handleGetOccasion = getDocument();
export const handleAddOccasions = addDocuments();
export const handleUpdateOccasion = updateDocument();
export const handleUpdateOccasions = updateDocuments();
export const handleDeleteOccasion = deleteDocument();
export const handleDeleteOccasions = deleteDocuments();
