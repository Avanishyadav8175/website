import getSlice from "@/common/utils/redux/getSlice";
import { type ImageDocument } from "@/common/types/documentation/media/image";

const slice = getSlice<ImageDocument>({
  sliceName: "images",
  documentName: "image",
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
  apiRoute: "/api/admin/media/image",
  selectKeys: [
    "alt",
    "defaultAlt",
    "folderId",
    "url",
    "isDeleted",
    "createdBy",
    "updatedBy",
    "createdAt",
    "updatedAt"
  ],
  searchKeys: [],
  optionLabelKey: "alt"
});

export const imageReducer = slice.reducer;
export const createImageAction = slice.createAction;
export const selectImage = slice.select;
