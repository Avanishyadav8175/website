// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { CatalogueDocument } from "@/common/types/documentation/presets/catalogue";

const slice = getSlice<CatalogueDocument>({
  sliceName: "catalogues",
  documentName: "catalogue",
  initialState: {
    documentList: [],
    documents: [],
    query: {
      options: {
        filter: [
          {
            label: "Category",
            value: "category"
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
        sort: "createdAt",
        order: "asc"
      }
    },
    status: "idle",
    notifications: []
  },
  apiRoute: "/api/admin/preset/catalogue",
  selectKeys: [
    "category",
    "name",
    "path",
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

export const catalogueReducer = slice.reducer;
export const createCatalogueAction = slice.createAction;
export const selectCatalogue = slice.select;
