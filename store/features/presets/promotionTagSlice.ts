// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { PromotionTagDocument } from "@/common/types/documentation/presets/promotionTag";

const slice = getSlice<PromotionTagDocument>({
  sliceName: "promotionTags",
  documentName: "promotionTag",
  initialState: {
    documentList: [],
    documents: [],
    query: {
      options: {
        filter: [
          {
            label: "Color",
            value: "color"
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
  apiRoute: "/api/admin/preset/promotion-tag",
  selectKeys: [
    "name",
    "color",
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

export const promotionTagReducer = slice.reducer;
export const createPromotionTagAction = slice.createAction;
export const selectPromotionTag = slice.select;
