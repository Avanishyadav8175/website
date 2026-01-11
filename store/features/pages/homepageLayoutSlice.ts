// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { type HomepageLayoutDocument } from "@/common/types/documentation/pages/homepageLayout";

const slice = getSlice<HomepageLayoutDocument>({
  sliceName: "homepageLayouts",
  documentName: "homepageLayout",
  initialState: {
    documentList: [],
    documents: [],
    query: {
      options: {
        filter: [
          { label: "Type", value: "type" },
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
            label: "Order",
            value: "order"
          },
          {
            label: "Type",
            value: "type"
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
        sort: "createdAt",
        order: "desc"
      }
    },
    status: "idle",
    notifications: []
  },
  apiRoute: "/api/admin/page/homepage-layout",
  selectKeys: [
    "order",
    "type",
    "title",
    "subtitle",
    "layout",
    "leftAlign",
    "extraSpacing",
    "customBG",
    "isActive",
    "isDeleted",
    "createdBy",
    "updatedBy",
    "createdAt",
    "updatedAt"
  ],
  searchKeys: ["title"],
  optionLabelKey: "title"
});

export const homepageLayoutReducer = slice.reducer;
export const createHomepageLayoutAction = slice.createAction;
export const selectHomepageLayout = slice.select;
