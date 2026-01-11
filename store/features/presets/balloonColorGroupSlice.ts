// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { BalloonColorGroupDocument } from "@/common/types/documentation/presets/balloonColorGroup";

const slice = getSlice<BalloonColorGroupDocument>({
  sliceName: "balloonColorGroups",
  documentName: "balloonColorGroup",
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
            label: "Updated At",
            value: "updatedAt"
          }
        ]
      },
      default: {
        filter: "",
        sort: "updatedAt",
        order: "desc"
      }
    },
    status: "idle",
    notifications: []
  },
  apiRoute: "/api/admin/preset/balloon-color-group",
  selectKeys: [
    "name",
    "colors",
    "isActive",
    "isDeleted",
    "createdAt",
    "updatedAt",
    "createdBy",
    "updatedBy"
  ],
  searchKeys: ["name", "colors"],
  optionLabelKey: "name"
});

export const balloonColorGroupReducer = slice.reducer;
export const createBalloonColorGroupAction = slice.createAction;
export const selectBalloonColorGroup = slice.select;
