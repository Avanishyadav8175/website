// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { ProcessingTimeDocument } from "@/common/types/documentation/presets/processingTime";

const slice = getSlice<ProcessingTimeDocument>({
  sliceName: "processingTimes",
  documentName: "processingTime",
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
            label: "Label",
            value: "label"
          },
          {
            label: "Hours",
            value: "hours"
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
        sort: "hours",
        order: "asc"
      }
    },
    status: "idle",
    notifications: []
  },
  apiRoute: "/api/admin/preset/processing-time",
  selectKeys: [
    "label",
    "hours",
    "isActive",
    "isDeleted",
    "createdBy",
    "updatedBy",
    "createdAt",
    "updatedAt"
  ],
  searchKeys: ["label"],
  optionLabelKey: "label"
});

export const processingTimeReducer = slice.reducer;
export const createProcessingTimeAction = slice.createAction;
export const selectProcessingTime = slice.select;
