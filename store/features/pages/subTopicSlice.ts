// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { type SubTopicDocument } from "@/common/types/documentation/pages/subTopic";

const slice = getSlice<SubTopicDocument>({
  sliceName: "subTopics",
  documentName: "subTopic",
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
            label: "Page",
            value: "topic"
          },
          {
            label: "City",
            value: "city"
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
  apiRoute: "/api/admin/page/sub-topic",
  selectKeys: [
    "name",
    "slug",
    "category",
    "topic",
    "city",
    "personalizedReviews",
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

export const subTopicReducer = slice.reducer;
export const createSubTopicAction = slice.createAction;
export const selectSubTopic = slice.select;
