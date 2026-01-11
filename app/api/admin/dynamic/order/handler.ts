// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type OrderDocument,
  type OrderModel
} from "@/common/types/documentation/dynamic/order";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  deleteDocument
} = getHandler<OrderDocument, OrderModel>(MODELS.Orders);

export const handleGetOrders = getDocuments();
export const handleGetOrder = getDocument();
export const handleAddOrders = addDocuments();
export const handleUpdateOrder = updateDocument();
export const handleDeleteOrder = deleteDocument();
