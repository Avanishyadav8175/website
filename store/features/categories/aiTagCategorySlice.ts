// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { type AITagCategoryDocument } from "@/common/types/documentation/categories/aiTagCategory";

const slice = getSlice<AITagCategoryDocument>({
  sliceName: "aiTagCategories",
  documentName: "aiTagCategory",
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
  apiRoute: "/api/admin/category/ai-tag-category",
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

export const aiTagCategoryReducer = slice.reducer;
export const createAITagCategoryAction = slice.createAction;
export const selectAITagCategory = slice.select;
