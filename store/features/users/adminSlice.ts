// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { type AdminDocument } from "@/common/types/documentation/users/admin";

const slice = getSlice<AdminDocument>({
  sliceName: "admins",
  documentName: "admin",
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
            label: "Username",
            value: "userName"
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
        sort: "userName",
        order: "asc"
      }
    },
    status: "idle",
    notifications: []
  },
  apiRoute: "/api/admin/user/admin",
  selectKeys: [
    "status",
    "userName",
    "isSuperAdmin",
    "isDeleted",
    "createdBy",
    "updatedBy",
    "createdAt",
    "updatedAt"
  ],
  searchKeys: ["userName"],
  optionLabelKey: "userName"
});

export const adminReducer = slice.reducer;
export const createAdminAction = slice.createAction;
export const selectAdmin = slice.select;
