// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { CancellationPolicyDocument } from "@/common/types/documentation/presets/cancellationPolicy";

const slice = getSlice<CancellationPolicyDocument>({
  sliceName: "cancellationPolicies",
  documentName: "cancellationPolicy",
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
  apiRoute: "/api/admin/preset/cancellation-policy",
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

export const cancellationPolicyReducer = slice.reducer;
export const createCancellationPolicyAction = slice.createAction;
export const selectCancellationPolicy = slice.select;
