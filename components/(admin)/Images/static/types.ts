import { SetStateType } from "@/common/types/reactTypes";

export type ImageManagementType =
  | { asPopup?: false; maxSelections?: number }
  | ({
      asPopup?: true;
      open: boolean;
      setOpen: SetStateType<boolean>;
      maxSelections?: number;
    } & (
      | {
          multiSelect?: false;
          onSelectImages: (selectedImages: string) => void;
        }
      | {
          multiSelect: true;
          onSelectImages: (selectedImages: string[]) => void;
        }
    ));
