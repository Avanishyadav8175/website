// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type UpgradeDocument,
  type UpgradeModel
} from "@/common/types/documentation/presets/upgrade";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<UpgradeDocument, UpgradeModel>(MODELS.Upgrades);

export const handleGetUpgrades = getDocuments();
export const handleGetUpgrade = getDocument();
export const handleAddUpgrades = addDocuments();
export const handleUpdateUpgrade = updateDocument();
export const handleUpdateUpgrades = updateDocuments();
export const handleDeleteUpgrade = deleteDocument();
export const handleDeleteUpgrades = deleteDocuments();
