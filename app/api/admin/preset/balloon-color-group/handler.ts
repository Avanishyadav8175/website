// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type BalloonColorGroupDocument,
  type BalloonColorGroupModel
} from "@/common/types/documentation/presets/balloonColorGroup";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<BalloonColorGroupDocument, BalloonColorGroupModel>(
  MODELS.BalloonColorGroups
);

export const handleGetBalloonColorGroups = getDocuments();
export const handleGetBalloonColorGroup = getDocument();
export const handleAddBalloonColorGroups = addDocuments();
export const handleUpdateBalloonColorGroup = updateDocument();
export const handleUpdateBalloonColorGroups = updateDocuments();
export const handleDeleteBalloonColorGroup = deleteDocument();
export const handleDeleteBalloonColorGroups = deleteDocuments();
