// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { DeliveryDetailDocument } from "@/common/types/documentation/presets/deliveryDetail";

const slice = getSlice<DeliveryDetailDocument>({
  sliceName: "deliveryDetails",
  documentName: "deliveryDetail",
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
            label: "Label",
            value: "label"
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
        sort: "label",
        order: "asc"
      }
    },
    status: "idle",
    notifications: []
  },
  apiRoute: "/api/admin/preset/delivery-detail",
  selectKeys: [
    "label",
    "isActive",
    "isDeleted",
    "createdBy",
    "updatedBy",
    "createdAt",
    "updatedAt"
  ],
  searchKeys: ["label"],
  optionLabelKey: "label"
});

export const deliveryDetailReducer = slice.reducer;
export const createDeliveryDetailAction = slice.createAction;
export const selectDeliveryDetail = slice.select;
