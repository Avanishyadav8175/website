// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { EnhancementDocument } from "@/common/types/documentation/presets/enhancement";

const slice = getSlice<EnhancementDocument>({
  sliceName: "enhancements",
  documentName: "enhancement",
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
  apiRoute: "/api/admin/preset/enhancement",
  selectKeys: [
    "label",
    "image",
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

export const enhancementReducer = slice.reducer;
export const createEnhancementAction = slice.createAction;
export const selectEnhancement = slice.select;
