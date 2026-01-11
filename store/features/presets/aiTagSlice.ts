// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { AITagDocument } from "@/common/types/documentation/presets/aiTag";

const slice = getSlice<AITagDocument>({
  sliceName: "aiTags",
  documentName: "aiTag",
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
            label: "Updated At",
            value: "updatedAt"
          }
        ]
      },
      default: {
        filter: "",
        sort: "updatedAt",
        order: "desc"
      }
    },
    status: "idle",
    notifications: []
  },
  apiRoute: "/api/admin/preset/ai-tag",
  selectKeys: [
    "name",
    "category",
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

export const aiTagReducer = slice.reducer;
export const createAITagAction = slice.createAction;
export const selectAITag = slice.select;
