// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { SecurityQuestionDocument } from "@/common/types/documentation/presets/securityQuestion";

const slice = getSlice<SecurityQuestionDocument>({
  sliceName: "securityQuestions",
  documentName: "securityQuestion",
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
            label: "Question",
            value: "question"
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
        sort: "question",
        order: "asc"
      }
    },
    status: "idle",
    notifications: []
  },
  apiRoute: "/api/admin/preset/security-question",
  selectKeys: [
    "question",
    "isActive",
    "isDeleted",
    "createdBy",
    "updatedBy",
    "createdAt",
    "updatedAt"
  ],
  searchKeys: ["question"],
  optionLabelKey: "question"
});

export const securityQuestionReducer = slice.reducer;
export const createSecurityQuestionAction = slice.createAction;
export const selectSecurityQuestion = slice.select;
