// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { type IdentificationImageDocument } from "@/common/types/documentation/media/identificationImage";

const slice = getSlice<IdentificationImageDocument>({
  sliceName: "identificationImages",
  documentName: "identificationImage",
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
        sort: []
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
  apiRoute: "/api/admin/media/identification-image",
  selectKeys: [
    "inUse",
    "isDeleted",
    "url",
    "createdBy",
    "updatedBy",
    "createdAt",
    "updatedAt"
  ],
  searchKeys: [],
  optionLabelKey: "createdAt"
});

export const identificationImageReducer = slice.reducer;
export const createIdentificationImageAction = slice.createAction;
export const selectIdentificationImage = slice.select;
