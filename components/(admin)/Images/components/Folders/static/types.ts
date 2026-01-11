import { FolderColors } from "@/common/constants/adminFolders";
import { SetStateType } from "@/common/types/reactTypes";
import { FolderColorType, FormEntriesType } from "@/common/types/types";
import { ImageManagementFolderType } from "../../../ImageManagementDeprecated";

export type ImageManagementFoldersType = {
  folders: ImageManagementFolderType[];
  folderLayout: "tiles" | "list";
  setFolderLayout: SetStateType<"tiles" | "list">;
  currColorFilter: FolderColors | undefined;
  setCurrColorFilter: SetStateType<FolderColors | undefined>;
  setFolderDataInQ: SetStateType<{ _id: string }>;
  selectedFolder: { _id: string };
  setSelectedFolder: SetStateType<{ _id: string }>;
  setShowFolderDetails: SetStateType<boolean>;
  setConfirmDelete: SetStateType<{
    mode: "image" | "folder";
    showDialog: boolean;
  }>;
  showFolderDetails: boolean;
  folderDataInQ: { _id: string };
  createOrEditFolder: (formData: FormEntriesType) => void;
  updateFolderColor: (id: string, color: FolderColorType) => void;
  asPopup: boolean;
};
