// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type DeliveryDetailDocument,
  type DeliveryDetailModel
} from "@/common/types/documentation/presets/deliveryDetail";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<DeliveryDetailDocument, DeliveryDetailModel>(
  MODELS.DeliveryDetails
);

export const handleGetDeliveryDetails = getDocuments();
export const handleGetDeliveryDetail = getDocument();
export const handleAddDeliveryDetails = addDocuments();
export const handleUpdateDeliveryDetail = updateDocument();
export const handleUpdateDeliveryDetails = updateDocuments();
export const handleDeleteDeliveryDetail = deleteDocument();
export const handleDeleteDeliveryDetails = deleteDocuments();
