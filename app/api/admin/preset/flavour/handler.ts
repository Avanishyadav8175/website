// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type FlavourDocument,
  type FlavourModel
} from "@/common/types/documentation/presets/flavour";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<FlavourDocument, FlavourModel>(MODELS.Flavours);

export const handleGetFlavours = getDocuments();
export const handleGetFlavour = getDocument();
export const handleAddFlavours = addDocuments();
export const handleUpdateFlavour = updateDocument();
export const handleUpdateFlavours = updateDocuments();
export const handleDeleteFlavour = deleteDocument();
export const handleDeleteFlavours = deleteDocuments();
