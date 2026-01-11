// next config
export const dynamic = "force-dynamic";

// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type FoundUsSourceDocument,
  type FoundUsSourceModel
} from "@/common/types/documentation/presets/foundUsSource";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<FoundUsSourceDocument, FoundUsSourceModel>(
  MODELS.FoundUsSources
);

export const handleGetFoundUsSources = getDocuments();
export const handleGetFoundUsSource = getDocument();
export const handleAddFoundUsSources = addDocuments();
export const handleUpdateFoundUsSource = updateDocument();
export const handleUpdateFoundUsSources = updateDocuments();
export const handleDeleteFoundUsSource = deleteDocument();
export const handleDeleteFoundUsSources = deleteDocuments();
