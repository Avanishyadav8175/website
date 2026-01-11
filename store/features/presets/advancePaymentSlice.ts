// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { AdvancePaymentDocument } from "@/common/types/documentation/presets/advancePayment";

const slice = getSlice<AdvancePaymentDocument>({
  sliceName: "advancePayments",
  documentName: "advancePayment",
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
            label: "Value",
            value: "value"
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
        sort: "value",
        order: "asc"
      }
    },
    status: "idle",
    notifications: []
  },
  apiRoute: "/api/admin/preset/advance-payment",
  selectKeys: [
    "label",
    "value",
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

export const advancePaymentReducer = slice.reducer;
export const createAdvancePaymentAction = slice.createAction;
export const selectAdvancePayment = slice.select;
