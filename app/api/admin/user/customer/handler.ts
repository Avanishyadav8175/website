// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type CustomerDocument,
  type CustomerModel
} from "@/common/types/documentation/users/customer";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  deleteDocument
} = getHandler<CustomerDocument, CustomerModel>(MODELS.Customers);

export const handleGetCustomers = getDocuments();
export const handleGetCustomer = getDocument();
export const handleAddCustomers = addDocuments();
export const handleUpdateCustomer = updateDocument();
export const handleDeleteCustomer = deleteDocument();
