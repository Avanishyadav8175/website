// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { ColorDocument } from "@/common/types/documentation/presets/color";

const slice = getSlice<ColorDocument>({
  sliceName: "colors",
  documentName: "color",
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
  apiRoute: "/api/admin/preset/color",
  selectKeys: [
    "name",
    "hexCode",
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

export const colorReducer = slice.reducer;
export const createColorAction = slice.createAction;
export const selectColor = slice.select;
