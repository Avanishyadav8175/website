// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { CityDocument } from "@/common/types/documentation/presets/city";

const slice = getSlice<CityDocument>({
  sliceName: "cities",
  documentName: "city",
  initialState: {
    documentList: [],
    documents: [],
    query: {
      options: {
        filter: [
          {
            label: "State",
            value: "state"
          },
          {
            label: "Aliases",
            value: "aliases"
          },
          {
            label: "Top City",
            value: "isTopCity"
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
  apiRoute: "/api/admin/preset/city",
  selectKeys: [
    "state",
    "name",
    "aliases",
    "isTopCity",
    "isActive",
    "isDeleted",
    "createdBy",
    "updatedBy",
    "createdAt",
    "updatedAt"
  ],
  searchKeys: ["name", "aliases"],
  optionLabelKey: "name"
});

export const cityReducer = slice.reducer;
export const createCityAction = slice.createAction;
export const selectCity = slice.select;
