// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { GSTDocument } from "@/common/types/documentation/presets/gst";

const slice = getSlice<GSTDocument>({
  sliceName: "gsts",
  documentName: "gst",
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
            label: "Value",
            value: "value"
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
        sort: "value",
        order: "asc"
      }
    },
    status: "idle",
    notifications: []
  },
  apiRoute: "/api/admin/preset/gst",
  selectKeys: [
    "label",
    "value",
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

export const gstReducer = slice.reducer;
export const createGSTAction = slice.createAction;
export const selectGST = slice.select;
