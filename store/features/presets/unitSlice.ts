// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { UnitDocument } from "@/common/types/documentation/presets/unit";

const slice = getSlice<UnitDocument>({
  sliceName: "units",
  documentName: "unit",
  initialState: {
    documentList: [],
    documents: [],
    query: {
      options: {
        filter: [
          {
            label: "Serving Info",
            value: "serves"
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
        sort: "name",
        order: "asc"
      }
    },
    status: "idle",
    notifications: []
  },
  apiRoute: "/api/admin/preset/unit",
  selectKeys: [
    "name",
    "abbr",
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

export const unitReducer = slice.reducer;
export const createUnitAction = slice.createAction;
export const selectUnit = slice.select;
