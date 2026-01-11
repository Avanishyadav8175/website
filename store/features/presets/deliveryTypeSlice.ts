// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { DeliveryTypeDocument } from "@/common/types/documentation/presets/deliveryType";

const slice = getSlice<DeliveryTypeDocument>({
  sliceName: "deliveryTypes",
  documentName: "deliveryType",
  initialState: {
    documentList: [],
    documents: [],
    query: {
      options: {
        filter: [
          {
            label: "Created By",
            value: "createdBy"
          },
          {
            label: "Updated By",
            value: "updatedBy"
          }
        ],
        sort: [
          {
            label: "Name",
            value: "name"
          },
          {
            label: "Price",
            value: "price"
          },
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
        sort: "name",
        order: "asc"
      }
    },
    status: "idle",
    notifications: []
  },
  apiRoute: "/api/admin/preset/delivery-type",
  selectKeys: [
    "name",
    "price",
    "timeSlots",
    "isActive",
    "isDeleted",
    "createdBy",
    "updatedBy",
    "createdAt",
    "updatedAt"
  ],
  searchKeys: ["name"],
  optionLabelKey: "name"
});

export const deliveryTypeReducer = slice.reducer;
export const createDeliveryTypeAction = slice.createAction;
export const selectDeliveryType = slice.select;
