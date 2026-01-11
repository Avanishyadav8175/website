// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { type TopicDocument } from "@/common/types/documentation/pages/topic";

const slice = getSlice<TopicDocument>({
  sliceName: "topics",
  documentName: "topic",
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
  apiRoute: "/api/admin/page/topic",
  selectKeys: [
    "name",
    "slug",
    "category",
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

export const topicReducer = slice.reducer;
export const createTopicAction = slice.createAction;
export const selectTopic = slice.select;
