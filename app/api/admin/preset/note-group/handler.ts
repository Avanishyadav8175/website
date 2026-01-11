// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type NoteGroupDocument,
  type NoteGroupModel
} from "@/common/types/documentation/presets/noteGroup";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<NoteGroupDocument, NoteGroupModel>(MODELS.NoteGroups);

export const handleGetNoteGroups = getDocuments();
export const handleGetNoteGroup = getDocument();
export const handleAddNoteGroups = addDocuments();
export const handleUpdateNoteGroup = updateDocument();
export const handleUpdateNoteGroups = updateDocuments();
export const handleDeleteNoteGroup = deleteDocument();
export const handleDeleteNoteGroups = deleteDocuments();
