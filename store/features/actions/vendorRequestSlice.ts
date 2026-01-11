// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { type VendorRequestDocument } from "@/common/types/documentation/actions/vendorRequest";

const slice = getSlice<VendorRequestDocument>({
  sliceName: "vendorRequests",
  documentName: "vendorRequest",
  initialState: {
    documentList: [],
    documents: [],
    query: {
      options: {
        filter: [
          {
            label: "Status",
            value: "status"
          },
          {
            label: "Found Us Source",
            value: "foundUs"
          },
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
  apiRoute: "/api/admin/action/vendor-request",
  selectKeys: [
    "status",
    "businessName",
    "ownerName",
    "mobile",
    "city",
    "foundUs",
    "isDeleted",
    "createdBy",
    "updatedBy",
    "createdAt",
    "updatedAt"
  ],
  searchKeys: ["businessName", "ownerName", "mobile", "mail"],
  optionLabelKey: "businessName"
});

export const vendorRequestReducer = slice.reducer;
export const createVendorRequestAction = slice.createAction;
export const selectVendorRequest = slice.select;
