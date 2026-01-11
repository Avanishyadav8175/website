// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { BrandDocument } from "@/common/types/documentation/presets/brand";

const slice = getSlice<BrandDocument>({
  sliceName: "brands",
  documentName: "brand",
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
            label: "Name",
            value: "name"
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
        sort: "updatedAt",
        order: "desc"
      }
    },
    status: "idle",
    notifications: []
  },
  apiRoute: "/api/admin/preset/brand",
  selectKeys: [
    "name",
    "reviews",
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

export const brandReducer = slice.reducer;
export const createBrandAction = slice.createAction;
export const selectBrand = slice.select;
