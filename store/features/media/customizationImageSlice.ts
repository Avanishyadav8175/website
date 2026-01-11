// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { type CustomizationImageDocument } from "@/common/types/documentation/media/customizationImage";

const slice = getSlice<CustomizationImageDocument>({
  sliceName: "customizationImages",
  documentName: "customizationImage",
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
  apiRoute: "/api/admin/media/customization-image",
  selectKeys: [
    "contentName",
    "url",
    "isInCart",
    "isOrdered",
    "isDelivered",
    "createdBy",
    "updatedBy",
    "createdAt",
    "updatedAt"
  ],
  searchKeys: [],
  optionLabelKey: "createdAt"
});

export const customizationImageReducer = slice.reducer;
export const createCustomizationImageAction = slice.createAction;
export const selectCustomizationImage = slice.select;
