// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { type AddonDocument } from "@/common/types/documentation/contents/addon";

const slice = getSlice<AddonDocument>({
  sliceName: "addons",
  documentName: "addon",
  initialState: {
    documentList: [],
    documents: [],
    query: {
      options: {
        filter: [
          {
            label: "Category",
            value: "category"
          },
          {
            label: "Edible",
            // @ts-ignore
            value: "edible.isEdible"
          },
          {
            label: "Edible Type",
            // @ts-ignore
            value: "edible.type"
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
  apiRoute: "/api/admin/content/addon",
  selectKeys: [
    "name",
    "category",
    "image",
    "price",
    "edible",
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

export const addonReducer = slice.reducer;
export const createAddonAction = slice.createAction;
export const selectAddon = slice.select;
