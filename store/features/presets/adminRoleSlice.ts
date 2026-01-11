// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { AdminRoleDocument } from "@/common/types/documentation/presets/adminRole";

const slice = getSlice<AdminRoleDocument>({
  sliceName: "adminRoles",
  documentName: "adminRole",
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
            label: "Updated At",
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
  apiRoute: "/api/admin/preset/admin-role",
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

export const adminRoleReducer = slice.reducer;
export const createAdminRoleAction = slice.createAction;
export const selectAdminRole = slice.select;
