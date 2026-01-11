// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { type DynamicPageDocument } from "@/common/types/documentation/pages/dynamicPage";

const slice = getSlice<DynamicPageDocument>({
  sliceName: "dynamicPages",
  documentName: "dynamicPage",
  initialState: {
    documentList: [],
    documents: [],
    query: {
      options: {
        filter: [
          { label: "Name", value: "name" },
          { label: "Slug", value: "slug" },
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
            label: "Slug",
            value: "slug"
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
  apiRoute: "/api/admin/page/dynamic-page",
  selectKeys: [
    "name",
    "slug",
    "layouts",
    "seoMeta",
    "isActive",
    "isDeleted",
    "createdBy",
    "updatedBy",
    "createdAt",
    "updatedAt"
  ],
  searchKeys: ["name"],
  optionLabelKey: "slug"
});

export const dynamicPageReducer = slice.reducer;
export const createDynamicPageAction = slice.createAction;
export const selectDynamicPageLayout = slice.select;
