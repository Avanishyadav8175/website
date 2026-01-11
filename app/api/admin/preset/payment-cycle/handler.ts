// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type PaymentCycleDocument,
  type PaymentCycleModel
} from "@/common/types/documentation/presets/paymentCycle";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<PaymentCycleDocument, PaymentCycleModel>(MODELS.PaymentCycles);

export const handleGetPaymentCycles = getDocuments();
export const handleGetPaymentCycle = getDocument();
export const handleAddPaymentCycles = addDocuments();
export const handleUpdatePaymentCycle = updateDocument();
export const handleUpdatePaymentCycles = updateDocuments();
export const handleDeletePaymentCycle = deleteDocument();
export const handleDeletePaymentCycles = deleteDocuments();
