// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { CommissionDocument } from "@/common/types/documentation/presets/commission";

const slice = getSlice<CommissionDocument>({
  sliceName: "commissions",
  documentName: "commission",
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
  apiRoute: "/api/admin/preset/commission",
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

export const commissionReducer = slice.reducer;
export const createCommissionAction = slice.createAction;
export const selectCommission = slice.select;
