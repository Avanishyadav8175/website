// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { type DeliveryDocument } from "@/common/types/documentation/dynamic/delivery";

const slice = getSlice<DeliveryDocument>({
  sliceName: "deliveries",
  documentName: "delivery",
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
  apiRoute: "/api/admin/dynamic/delivery",
  selectKeys: [
    "status",
    "order",
    "item",
    "vendor",
    "payment",
    "isRequestedCancellation",
    "createdBy",
    "updatedBy",
    "createdAt",
    "updatedAt"
  ],
  searchKeys: [],
  optionLabelKey: "status"
});

export const deliveryReducer = slice.reducer;
export const createDeliveryAction = slice.createAction;
export const selectDelivery = slice.select;
