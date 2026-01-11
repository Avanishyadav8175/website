// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type DeliveryDocument,
  type DeliveryModel
} from "@/common/types/documentation/dynamic/delivery";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  deleteDocument
} = getHandler<DeliveryDocument, DeliveryModel>(MODELS.Deliveries);

export const handleGetDeliveries = getDocuments();
export const handleGetDelivery = getDocument();
export const handleAddDeliveries = addDocuments();
export const handleUpdateDelivery = updateDocument();
export const handleDeleteDelivery = deleteDocument();
