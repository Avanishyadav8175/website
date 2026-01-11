// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { type FoundUsSourceDocument } from "@/common/types/documentation/presets/foundUsSource";

const slice = getSlice<FoundUsSourceDocument>({
  sliceName: "foundUsSources",
  documentName: "foundUsSource",
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
            label: "Source",
            value: "source"
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
        sort: "source",
        order: "asc"
      }
    },
    status: "idle",
    notifications: []
  },
  apiRoute: "/api/admin/preset/found-us-source",
  selectKeys: [
    "source",
    "isActive",
    "isDeleted",
    "createdBy",
    "updatedBy",
    "createdAt",
    "updatedAt"
  ],
  searchKeys: ["source"],
  optionLabelKey: "source"
});

export const foundUsSourceReducer = slice.reducer;
export const createFoundUsSourceAction = slice.createAction;
export const selectFoundUsSource = slice.select;
