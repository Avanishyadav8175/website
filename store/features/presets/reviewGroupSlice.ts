// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { ReviewGroupDocument } from "@/common/types/documentation/presets/reviewGroup";

const slice = getSlice<ReviewGroupDocument>({
  sliceName: "reviewGroups",
  documentName: "reviewGroup",
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
        sort: "name",
        order: "asc"
      }
    },
    status: "idle",
    notifications: []
  },
  apiRoute: "/api/admin/preset/review-group",
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

export const reviewGroupReducer = slice.reducer;
export const createReviewGroupAction = slice.createAction;
export const selectReviewGroup = slice.select;
