// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { type FooterSectionDocument } from "@/common/types/documentation/pages/footerSection";

const slice = getSlice<FooterSectionDocument>({
  sliceName: "footerSections",
  documentName: "footerSection",
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
            label: "Heading",
            value: "heading"
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
  apiRoute: "/api/admin/page/footer-section",
  selectKeys: [
    "heading",
    "path",
    "links",
    "order",
    "isActive",
    "isDeleted",
    "createdBy",
    "updatedBy",
    "createdAt",
    "updatedAt"
  ],
  searchKeys: ["heading"],
  optionLabelKey: "heading"
});

export const footerSectionReducer = slice.reducer;
export const createFooterSectionAction = slice.createAction;
export const selectFooterSection = slice.select;
