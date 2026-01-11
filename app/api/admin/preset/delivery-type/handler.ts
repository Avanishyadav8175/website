// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type DeliveryTypeDocument,
  type DeliveryTypeModel
} from "@/common/types/documentation/presets/deliveryType";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<DeliveryTypeDocument, DeliveryTypeModel>(MODELS.DeliveryTypes);

export const handleGetDeliveryTypes = getDocuments();
export const handleGetDeliveryType = getDocument();
export const handleAddDeliveryTypes = addDocuments();
export const handleUpdateDeliveryType = updateDocument();
export const handleUpdateDeliveryTypes = updateDocuments();
export const handleDeleteDeliveryType = deleteDocument();
export const handleDeleteDeliveryTypes = deleteDocuments();
