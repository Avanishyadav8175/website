// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type CancellationPolicyDocument,
  type CancellationPolicyModel
} from "@/common/types/documentation/presets/cancellationPolicy";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<CancellationPolicyDocument, CancellationPolicyModel>(
  MODELS.CancellationPolicies
);

export const handleGetCancellationPolicies = getDocuments();
export const handleGetCancellationPolicy = getDocument();
export const handleAddCancellationPolicies = addDocuments();
export const handleUpdateCancellationPolicy = updateDocument();
export const handleUpdateCancellationPolicies = updateDocuments();
export const handleDeleteCancellationPolicy = deleteDocument();
export const handleDeleteCancellationPolicies = deleteDocuments();
