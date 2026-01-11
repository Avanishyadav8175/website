// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type RelationDocument,
  type RelationModel
} from "@/common/types/documentation/presets/relation";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<RelationDocument, RelationModel>(MODELS.Relations);

export const handleGetRelations = getDocuments();
export const handleGetRelation = getDocument();
export const handleAddRelations = addDocuments();
export const handleUpdateRelation = updateDocument();
export const handleUpdateRelations = updateDocuments();
export const handleDeleteRelation = deleteDocument();
export const handleDeleteRelations = deleteDocuments();
