// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { type HeaderNavLinkDocument } from "@/common/types/documentation/pages/headerNavLink";

const slice = getSlice<HeaderNavLinkDocument>({
  sliceName: "headerNavLinks",
  documentName: "headerNavLink",
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
            label: "Order",
            value: "order"
          },
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
        sort: "order",
        order: "asc"
      }
    },
    status: "idle",
    notifications: []
  },
  apiRoute: "/api/admin/page/header-nav-link",
  selectKeys: [
    "label",
    "path",
    "sections",
    "order",
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

export const headerNavLinkReducer = slice.reducer;
export const createHeaderNavLinkAction = slice.createAction;
export const selectHeaderNavLink = slice.select;
