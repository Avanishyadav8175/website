// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type CommissionDocument,
  type CommissionModel
} from "@/common/types/documentation/presets/commission";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<CommissionDocument, CommissionModel>(MODELS.Commissions);

export const handleGetCommissions = getDocuments();
export const handleGetCommission = getDocument();
export const handleAddCommissions = addDocuments();
export const handleUpdateCommission = updateDocument();
export const handleUpdateCommissions = updateDocuments();
export const handleDeleteCommission = deleteDocument();
export const handleDeleteCommissions = deleteDocuments();
