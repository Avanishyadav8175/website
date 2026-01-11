// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type AddonDocument,
  type AddonModel
} from "@/common/types/documentation/contents/addon";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<AddonDocument, AddonModel>(MODELS.Addons);

export const handleGetAddons = getDocuments();
export const handleGetAddon = getDocument();
export const handleAddAddons = addDocuments();
export const handleUpdateAddon = updateDocument();
export const handleUpdateAddons = updateDocuments();
export const handleDeleteAddon = deleteDocument();
export const handleDeleteAddons = deleteDocuments();
