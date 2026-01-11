// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { VenueDocument } from "@/common/types/documentation/presets/venue";

const slice = getSlice<VenueDocument>({
  sliceName: "venues",
  documentName: "venue",
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
  apiRoute: "/api/admin/preset/venue",
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

export const venueReducer = slice.reducer;
export const createVenueAction = slice.createAction;
export const selectVenue = slice.select;
