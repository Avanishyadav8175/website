// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { type BlogArticleDocument } from "@/common/types/documentation/blog/blogArticle";

const slice = getSlice<BlogArticleDocument>({
  sliceName: "blogArticles",
  documentName: "blogArticle",
  initialState: {
    documentList: [],
    documents: [],
    query: {
      options: {
        filter: [
          {
            label: "Author",
            value: "author"
          },
          {
            label: "Category",
            value: "categories"
          },
          {
            label: "Tag",
            value: "tags"
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
        order: "desc"
      }
    },
    status: "idle",
    notifications: []
  },
  apiRoute: "/api/admin/blog/blog-article",
  selectKeys: [
    "author",
    "categories",
    "name",
    "slug",
    "heading",
    "tags",
    "meta",
    "layouts",
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

export const blogArticleReducer = slice.reducer;
export const createBlogArticleAction = slice.createAction;
export const selectBlogArticle = slice.select;
