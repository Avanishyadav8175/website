// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { SearchTagDocument } from "@/common/types/documentation/presets/searchTag";

const slice = getSlice<SearchTagDocument>({
  sliceName: "searchTags",
  documentName: "searchTag",
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
  apiRoute: "/api/admin/preset/search-tag",
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

export const searchTagReducer = slice.reducer;
export const createSearchTagAction = slice.createAction;
export const selectSearchTag = slice.select;
