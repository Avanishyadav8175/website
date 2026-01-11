// utils
import getSlice from "@/common/utils/redux/getSlice";

// types
import { NoteGroupDocument } from "@/common/types/documentation/presets/noteGroup";

const slice = getSlice<NoteGroupDocument>({
  sliceName: "noteGroups",
  documentName: "noteGroup",
  initialState: {
    documentList: [],
    documents: [],
    query: {
      options: {
        filter: [
          {
            label: "Occasion",
            value: "occasion"
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
  apiRoute: "/api/admin/preset/note-group",
  selectKeys: [
    "name",
    "occasion",
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

export const noteGroupReducer = slice.reducer;
export const createNoteGroupAction = slice.createAction;
export const selectNoteGroup = slice.select;
