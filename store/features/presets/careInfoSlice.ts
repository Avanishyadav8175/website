// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { CareInfoDocument } from "@/common/types/documentation/presets/careInfo";

const slice = getSlice<CareInfoDocument>({
  sliceName: "careInfos",
  documentName: "careInfo",
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
  apiRoute: "/api/admin/preset/care-info",
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

export const careInfoReducer = slice.reducer;
export const createCareInfoAction = slice.createAction;
export const selectCareInfo = slice.select;
