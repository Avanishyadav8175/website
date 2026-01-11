// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { PaymentCycleDocument } from "@/common/types/documentation/presets/paymentCycle";

const slice = getSlice<PaymentCycleDocument>({
  sliceName: "paymentCycles",
  documentName: "paymentCycle",
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
            label: "Days",
            value: "days"
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
        sort: "days",
        order: "asc"
      }
    },
    status: "idle",
    notifications: []
  },
  apiRoute: "/api/admin/preset/payment-cycle",
  selectKeys: [
    "label",
    "days",
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

export const paymentCycleReducer = slice.reducer;
export const createPaymentCycleAction = slice.createAction;
export const selectPaymentCycle = slice.select;
