// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { QuickLinkDocument } from "@/common/types/documentation/presets/quickLink";

const slice = getSlice<QuickLinkDocument>({
  sliceName: "quickLinks",
  documentName: "quickLink",
  initialState: {
    documentList: [],
    documents: [],
    query: {
      options: {
        filter: [
          {
            label: "Image",
            value: "image"
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
  apiRoute: "/api/admin/preset/quick-link",
  selectKeys: [
    "label",
    "path",
    "image",
    "isActive",
    "isDeleted",
    "createdBy",
    "updatedBy",
    "createdAt",
    "updatedAt"
  ],
  searchKeys: ["label", "path"],
  optionLabelKey: "label"
});

export const quickLinkReducer = slice.reducer;
export const createQuickLinkAction = slice.createAction;
export const selectQuickLink = slice.select;
