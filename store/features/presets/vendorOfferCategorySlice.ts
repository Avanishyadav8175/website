// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { VendorOfferCategoryDocument } from "@/common/types/documentation/presets/vendorOfferCategory";

const slice = getSlice<VendorOfferCategoryDocument>({
  sliceName: "vendorOfferCategories",
  documentName: "vendorOfferCategory",
  initialState: {
    documentList: [],
    documents: [],
    query: {
      options: {
        filter: [
          {
            label: "Type",
            value: "type"
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
            label: "Name",
            value: "name"
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
        sort: "name",
        order: "asc"
      }
    },
    status: "idle",
    notifications: []
  },
  apiRoute: "/api/admin/preset/vendor-offer-category",
  selectKeys: [
    "name",
    "type",
    "isActive",
    "isDeleted",
    "createdBy",
    "updatedBy",
    "createdAt",
    "updatedAt"
  ],
  searchKeys: ["name"],
  optionLabelKey: "name"
});

export const vendorOfferCategoryReducer = slice.reducer;
export const createVendorOfferCategoryAction = slice.createAction;
export const selectVendorOfferCategory = slice.select;
