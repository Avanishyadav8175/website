// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { type IssueImageDocument } from "@/common/types/documentation/media/issueImage";

const slice = getSlice<IssueImageDocument>({
  sliceName: "issueImages",
  documentName: "issueImage",
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
  apiRoute: "/api/admin/media/issue-image",
  selectKeys: [
    "isClosed",
    "isDeleted",
    "url",
    "createdBy",
    "updatedBy",
    "createdAt",
    "updatedAt"
  ],
  searchKeys: [],
  optionLabelKey: "createdAt"
});

export const issueImageReducer = slice.reducer;
export const createIssueImageAction = slice.createAction;
export const selectIssueImage = slice.select;
