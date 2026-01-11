// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { type SubSubSubTopicDocument } from "@/common/types/documentation/pages/subSubSubTopic";

const slice = getSlice<SubSubSubTopicDocument>({
  sliceName: "subSubSubTopics",
  documentName: "subSubSubTopic",
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
            label: "SubSubTopic",
            value: "subSubTopic"
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
  apiRoute: "/api/admin/page/sub-sub-sub-topic",
  selectKeys: [
    "name",
    "slug",
    "category",
    "topic",
    "subTopic",
    "subSubTopic",
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

export const subSubSubTopicReducer = slice.reducer;
export const createSubSubSubTopicAction = slice.createAction;
export const selectSubSubSubTopic = slice.select;
