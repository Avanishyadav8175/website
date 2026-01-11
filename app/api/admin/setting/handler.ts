// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type SettingDocument,
  type SettingModel
} from "@/common/types/documentation/settings/setting";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  deleteDocument
} = getHandler<SettingDocument, SettingModel>(MODELS.Settings);

export const handleGetSettings = getDocuments();
export const handleGetSetting = getDocument();
export const handleAddSettings = addDocuments();
export const handleUpdateSetting = updateDocument();
export const handleDeleteSetting = deleteDocument();
