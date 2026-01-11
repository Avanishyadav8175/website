// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type CareInfoDocument,
  type CareInfoModel
} from "@/common/types/documentation/presets/careInfo";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<CareInfoDocument, CareInfoModel>(MODELS.CareInfos);

export const handleGetCareInfos = getDocuments();
export const handleGetCareInfo = getDocument();
export const handleAddCareInfos = addDocuments();
export const handleUpdateCareInfo = updateDocument();
export const handleUpdateCareInfos = updateDocuments();
export const handleDeleteCareInfo = deleteDocument();
export const handleDeleteCareInfos = deleteDocuments();
