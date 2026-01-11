// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { type FolderDocument } from "@/common/types/documentation/media/folder";

const slice = getSlice<FolderDocument>({
  sliceName: "folders",
  documentName: "folder",
  initialState: {
    documentList: [],
    documents: [],
    query: {
      options: {
        filter: [
          {
            label: "imageCount",
            value: "imageCount"
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
            label: "imageCount",
            value: "imageCount"
          },
          {
            label: "Created By",
            value: "createdBy"
          },
          {
            label: "Updated By",
            value: "updatedBy"
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
  apiRoute: "/api/admin/media/folder",
  selectKeys: [
    "name",
    "label",
    "imageCount",
    "colorName",
    "isDeleted",
    "createdBy",
    "updatedBy",
    "createdAt",
    "updatedAt"
  ],
  searchKeys: [],
  optionLabelKey: "label"
});

export const folderReducer = slice.reducer;
export const createFolderAction = slice.createAction;
export const selectFolder = slice.select;
