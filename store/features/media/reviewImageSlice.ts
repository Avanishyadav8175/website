// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { type ReviewImageDocument } from "@/common/types/documentation/media/reviewImage";

const slice = getSlice<ReviewImageDocument>({
  sliceName: "reviewImages",
  documentName: "reviewImage",
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
        sort: []
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
  apiRoute: "/api/admin/media/review-image",
  selectKeys: [
    "alt",
    "inUse",
    "isDeleted",
    "createdBy",
    "updatedBy",
    "createdAt",
    "updatedAt"
  ],
  searchKeys: [],
  optionLabelKey: "createdAt"
});

export const reviewImageReducer = slice.reducer;
export const createReviewImageAction = slice.createAction;
export const selectReviewImage = slice.select;
