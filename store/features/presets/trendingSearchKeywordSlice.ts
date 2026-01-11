// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { TrendingSearchKeywordDocument } from "@/common/types/documentation/presets/trendingSearchKeyword";

const slice = getSlice<TrendingSearchKeywordDocument>({
  sliceName: "trendingSearchKeywords",
  documentName: "trendingSearchKeyword",
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
        sort: "label",
        order: "asc"
      }
    },
    status: "idle",
    notifications: []
  },
  apiRoute: "/api/admin/preset/trending-search-keyword",
  selectKeys: [
    "label",
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

export const trendingSearchKeywordReducer = slice.reducer;
export const createTrendingSearchKeywordAction = slice.createAction;
export const selectTrendingSearchKeyword = slice.select;
