// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type LeadDocument,
  type LeadModel
} from "@/common/types/documentation/actions/lead";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  deleteDocument
} = getHandler<LeadDocument, LeadModel>(MODELS.Leads);

export const handleGetLeads = getDocuments();
export const handleGetLead = getDocument();
export const handleAddLeads = addDocuments();
export const handleUpdateLead = updateDocument();
export const handleDeleteLead = deleteDocument();
