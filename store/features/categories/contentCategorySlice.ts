// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { type ContentCategoryDocument } from "@/common/types/documentation/categories/contentCategory";

const slice = getSlice<ContentCategoryDocument>({
  sliceName: "contentCategories",
  documentName: "contentCategory",
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
  apiRoute: "/api/admin/category/content-category",
  selectKeys: [
    "name",
    "slug",
    // @ts-ignore
    "media.icon",
    "personalizedReviews",
    "isActive",
    "isDeleted",
    "createdBy",
    "updatedBy",
    "createdAt",
    "updatedAt"
  ],
  searchKeys: ["name", "slug"],
  optionLabelKey: "name"
});

export const contentCategoryReducer = slice.reducer;
export const createContentCategoryAction = slice.createAction;
export const selectContentCategory = slice.select;
