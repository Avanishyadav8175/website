// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { type CustomerDocument } from "@/common/types/documentation/users/customer";

const slice = getSlice<CustomerDocument>({
  sliceName: "customers",
  documentName: "customer",
  initialState: {
    documentList: [],
    documents: [],
    query: {
      options: {
        filter: [],
        sort: [
          {
            label: "Created At",
            value: "createdAt"
          },
          {
            label: "UpdatedAt",
            value: "updatedAt"
          }
        ]
      },
      default: {
        filter: "",
        sort: "updatedAt",
        order: "desc"
      }
    },
    status: "idle",
    notifications: []
  },
  apiRoute: "/api/admin/user/customer",
  selectKeys: [
    "name",
    "mobileNumber",
    "lastVisitedContents",
    "cart",
    "orders",
    "points",
    "status",
    "conversionStatus",
    "isDeleted",
    "createdBy",
    "updatedBy",
    "createdAt",
    "updatedAt"
  ],
  searchKeys: ["mail", "mobileNumber"],
  optionLabelKey: "status"
});

export const customerReducer = slice.reducer;
export const createCustomerAction = slice.createAction;
export const selectCustomer = slice.select;
