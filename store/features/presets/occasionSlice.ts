// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { OccasionDocument } from "@/common/types/documentation/presets/occasion";

const slice = getSlice<OccasionDocument>({
  sliceName: "occasions",
  documentName: "occasion",
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
        sort: "name",
        order: "asc"
      }
    },
    status: "idle",
    notifications: []
  },
  apiRoute: "/api/admin/preset/occasion",
  selectKeys: [
    "name",
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

export const occasionReducer = slice.reducer;
export const createOccasionAction = slice.createAction;
export const selectOccasion = slice.select;
