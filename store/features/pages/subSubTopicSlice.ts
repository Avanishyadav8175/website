// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { type SubSubTopicDocument } from "@/common/types/documentation/pages/subSubTopic";

const slice = getSlice<SubSubTopicDocument>({
  sliceName: "subSubTopics",
  documentName: "subSubTopic",
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
            label: "SubTopic",
            value: "subTopic"
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
  apiRoute: "/api/admin/page/sub-sub-topic",
  selectKeys: [
    "name",
    "slug",
    "category",
    "topic",
    "subTopic",
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

export const subSubTopicReducer = slice.reducer;
export const createSubSubTopicAction = slice.createAction;
export const selectSubSubTopic = slice.select;
