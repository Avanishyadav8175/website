// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { type BlogCategoryDocument } from "@/common/types/documentation/blog/blogCategory";

const slice = getSlice<BlogCategoryDocument>({
  sliceName: "blogCategories",
  documentName: "blogCategory",
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
        sort: "name",
        order: "asc"
      }
    },
    status: "idle",
    notifications: []
  },
  apiRoute: "/api/admin/blog/blog-category",
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

export const blogCategoryReducer = slice.reducer;
export const createBlogCategoryAction = slice.createAction;
export const selectBlogCategory = slice.select;
