// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { UpgradeDocument } from "@/common/types/documentation/presets/upgrade";

const slice = getSlice<UpgradeDocument>({
  sliceName: "upgrades",
  documentName: "upgrade",
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
  apiRoute: "/api/admin/preset/upgrade",
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

export const upgradeReducer = slice.reducer;
export const createUpgradeAction = slice.createAction;
export const selectUpgrade = slice.select;
