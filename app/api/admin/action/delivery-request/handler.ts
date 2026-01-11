// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type DeliveryRequestDocument,
  type DeliveryRequestModel
} from "@/common/types/documentation/actions/deliveryRequest";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  deleteDocument
} = getHandler<DeliveryRequestDocument, DeliveryRequestModel>(
  MODELS.DeliveryRequests
);

export const handleGetDeliveryRequests = getDocuments();
export const handleGetDeliveryRequest = getDocument();
export const handleAddDeliveryRequests = addDocuments();
export const handleUpdateDeliveryRequest = updateDocument();
export const handleDeleteDeliveryRequest = deleteDocument();
