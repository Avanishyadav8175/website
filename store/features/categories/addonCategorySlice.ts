// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { type AddonCategoryDocument } from "@/common/types/documentation/categories/addonCategory";

const slice = getSlice<AddonCategoryDocument>({
  sliceName: "addonCategories",
  documentName: "addonCategory",
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
            label: "UpdatedAt",
            value: "updatedAt"
          }
        ]
      },
      default: {
        filter: "",
        sort: "createdAt",
        order: "asc"
      }
    },
    status: "idle",
    notifications: []
  },
  apiRoute: "/api/admin/category/addon-category",
  selectKeys: [
    "name",
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

export const addonCategoryReducer = slice.reducer;
export const createAddonCategoryAction = slice.createAction;
export const selectAddonCategory = slice.select;
