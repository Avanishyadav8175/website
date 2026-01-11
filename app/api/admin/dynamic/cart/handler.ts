// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type CartDocument,
  type CartModel
} from "@/common/types/documentation/dynamic/cart";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  deleteDocument
} = getHandler<CartDocument, CartModel>(MODELS.Carts);

export const handleGetCarts = getDocuments();
export const handleGetCart = getDocument();
export const handleAddCarts = addDocuments();
export const handleUpdateCart = updateDocument();
export const handleDeleteCart = deleteDocument();
