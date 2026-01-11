// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { type OrderDocument } from "@/common/types/documentation/dynamic/order";

const slice = getSlice<OrderDocument>({
  sliceName: "orders",
  documentName: "order",
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
        sort: "createdAt",
        order: "desc"
      }
    },
    status: "idle",
    notifications: []
  },
  apiRoute: "/api/admin/dynamic/order",
  selectKeys: [
    // @ts-ignore
    "id",
    "cart",
    "payment",
    "createdBy",
    "updatedBy",
    "createdAt",
    "updatedAt"
  ],
  // @ts-ignore
  searchKeys: ["id"],
  optionLabelKey: "createdBy"
});

export const orderReducer = slice.reducer;
export const createOrderAction = slice.createAction;
export const selectOrder = slice.select;
