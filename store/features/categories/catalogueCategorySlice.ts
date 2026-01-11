// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { type CatalogueCategoryDocument } from "@/common/types/documentation/categories/catalogueCategory";

const slice = getSlice<CatalogueCategoryDocument>({
  sliceName: "catalogueCategories",
  documentName: "catalogueCategory",
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
        order: "desc"
      }
    },
    status: "idle",
    notifications: []
  },
  apiRoute: "/api/admin/category/catalogue-category",
  selectKeys: [
    "name",
    "title",
    "icon",
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

export const catalogueCategoryReducer = slice.reducer;
export const createCatalogueCategoryAction = slice.createAction;
export const selectCatalogueCategory = slice.select;
