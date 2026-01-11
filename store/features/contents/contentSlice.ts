// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { type ContentDocument } from "@/common/types/documentation/contents/content";

const slice = getSlice<ContentDocument>({
  sliceName: "contents",
  documentName: "content",
  initialState: {
    documentList: [],
    documents: [],
    query: {
      options: {
        filter: [
          {
            label: "Category",
            // @ts-ignore
            value: "category.primary"
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
  apiRoute: "/api/admin/content/content",
  selectKeys: [
    "type",
    "name",
    "slug",
    // @ts-ignore
    "category.primary",
    // @ts-ignore
    "media.primary",
    // @ts-ignore
    "price.base",
    // @ts-ignore
    "availability.availableAt",
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

export const contentReducer = slice.reducer;
export const createContentAction = slice.createAction;
export const selectContent = slice.select;
