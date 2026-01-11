// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type AdvancePaymentDocument,
  type AdvancePaymentModel
} from "@/common/types/documentation/presets/advancePayment";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<AdvancePaymentDocument, AdvancePaymentModel>(
  MODELS.AdvancePayments
);

export const handleGetAdvancePayments = getDocuments();
export const handleGetAdvancePayment = getDocument();
export const handleAddAdvancePayments = addDocuments();
export const handleUpdateAdvancePayment = updateDocument();
export const handleUpdateAdvancePayments = updateDocuments();
export const handleDeleteAdvancePayment = deleteDocument();
export const handleDeleteAdvancePayments = deleteDocuments();
