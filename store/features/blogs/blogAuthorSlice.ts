// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { type BlogAuthorDocument } from "@/common/types/documentation/blog/blogAuthor";

const slice = getSlice<BlogAuthorDocument>({
  sliceName: "blogAuthors",
  documentName: "blogAuthor",
  initialState: {
    documentList: [],
    documents: [],
    query: {
      options: {
        filter: [
          {
            label: "Bio",
            value: "bio"
          },
          {
            label: "Photo",
            value: "photo"
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
  apiRoute: "/api/admin/blog/blog-author",
  selectKeys: [
    "name",
    "photo",
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

export const blogAuthorReducer = slice.reducer;
export const createBlogAuthorAction = slice.createAction;
export const selectBlogAuthor = slice.select;
