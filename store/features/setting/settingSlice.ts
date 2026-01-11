// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { type SettingDocument } from "@/common/types/documentation/settings/setting";

const slice = getSlice<SettingDocument>({
  sliceName: "settings",
  documentName: "setting",
  initialState: {
    documentList: [],
    documents: [],
    query: {
      options: {
        filter: [],
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
  apiRoute: "/api/admin/setting",
  selectKeys: [
    "auth",
    "payment",
    "callback",
    "contact",
    "icon",
    "logo",
    "serviceImage",
    "social",
    "createdBy",
    "updatedBy",
    "createdAt",
    "updatedAt"
  ],
  searchKeys: ["createdBy"],
  optionLabelKey: "createdBy"
});

export const settingReducer = slice.reducer;
export const createSettingAction = slice.createAction;
export const selectSetting = slice.select;
