// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { CountryCodeDocument } from "@/common/types/documentation/presets/countryCode";

const slice = getSlice<CountryCodeDocument>({
  sliceName: "countryCodes",
  documentName: "countryCode",
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
  apiRoute: "/api/admin/preset/country-code",
  selectKeys: [
    "name",
    "code",
    "isActive",
    "isDeleted",
    "createdBy",
    "updatedBy",
    "createdAt",
    "updatedAt"
  ],
  searchKeys: ["name", "code"],
  optionLabelKey: "name"
});

export const countryCodeReducer = slice.reducer;
export const createCountryCodeAction = slice.createAction;
export const selectCountryCode = slice.select;
