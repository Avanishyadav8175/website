// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { type VendorDocument } from "@/common/types/documentation/users/vendor";

const slice = getSlice<VendorDocument>({
  sliceName: "vendors",
  documentName: "vendor",
  initialState: {
    documentList: [],
    documents: [],
    query: {
      options: {
        filter: [
          {
            label: "City",
            // @ts-ignore
            value: "location.city"
          },
          {
            label: "Category",
            // @ts-ignore
            value: "business.categories"
          },
          {
            label: "Created By Edited",
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
        sort: "createdAt",
        order: "desc"
      }
    },
    status: "idle",
    notifications: []
  },
  apiRoute: "/api/admin/user/vendor",
  selectKeys: [
    "status",
    "businessName",
    "ownerName",
    // @ts-ignore
    "location.city",
    // @ts-ignore
    "business.categories",
    "contents",
    "cities",
    "isDeleted",
    "createdBy",
    "updatedBy",
    "createdAt",
    "updatedAt"
  ],
  searchKeys: ["businessName", "ownerName", "userName"],
  optionLabelKey: "businessName"
});

export const vendorReducer = slice.reducer;
export const createVendorAction = slice.createAction;
export const selectVendor = slice.select;
