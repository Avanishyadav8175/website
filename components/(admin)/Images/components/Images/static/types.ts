import { ImageDocument } from "@/common/types/documentation/media/image";
import { ImageManagementFolderType } from "../../../ImageManagementDeprecated";
import { SetStateType } from "@/common/types/reactTypes";
import { SelectedImages } from "@/lib/Forms/FileSelect/static/types";
import { SelectOption } from "@/common/types/inputs";

export type ImageManagementImagesType = {
  images: ImageDocument[];
  folders: ImageManagementFolderType[];
  selectedFolder: { _id: string };
  setConfirmDelete: SetStateType<{
    mode: "image" | "folder";
    showDialog: boolean;
  }>;
  setImgIdToDelete: SetStateType<string>;
  showImgDetails: boolean;
  setShowImgDetails: SetStateType<boolean>;
  dataInQ: {
    folderName: string;
    url: string;
    alt: string;
  };
  setDataInQ: SetStateType<{
    folderName: string;
    url: string;
    alt: string;
  }>;
  folderOptions: SelectOption[];
  showEditImgDialog: boolean;
  setShowEditImgDialog: SetStateType<boolean>;
  showAlts: boolean;
  setShowAlts: SetStateType<boolean>;
  isOptionsOpen: boolean;
  toggleOptionsView: () => void;
  isTrashOpen: boolean;
  showTrash: () => void;
  handleImgSelections: (imgs: SelectedImages[]) => void;
  onSubmitImgUpload: () => void;
  updateAlt: (id: string, alt: string) => void;
  restoreImage: (id: string) => void;
  asPopup: boolean;
  enableSelection: boolean;
  setEnableSelection: SetStateType<boolean>;
  selectedImgs: string[];
  setSelectedImgs: (newlySelectedImg: string) => void;
  optedFolder: string;
  setOptedFolder: (newId: string) => void;
};
