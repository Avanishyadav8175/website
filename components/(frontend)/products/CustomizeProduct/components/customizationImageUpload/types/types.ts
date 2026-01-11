import { ClassNameType, SetStateType } from "@/common/types/reactTypes";

export type CustomSelectInputType = {
  limit: number;
  name: string;
  isDisabled?: boolean;
  customValue?: {
    value: any;
    setValue: SetStateType<any>;
  };
  className?: ClassNameType;
  customStyles?: ClassNameType;
  onImagesSelect: (imgs: SelectedImages[]) => void;
} & (
  | { isRequired: false }
  | {
      isRequired: true;
      labelConfig: {
        label: string;
        labelStyle?: ClassNameType;
        layoutStyle?: ClassNameType;
      };
    }
) &
  (
    | {
        showEmptyFieldError: false;
      }
    | {
        showEmptyFieldError: true;
        emptyFieldErrorText: string;
      }
  );

export type SelectedImages = {
  url: string;
  name: string;
  extension: string;
  alt: string;
  width: number;
  height: number;
  size: number;
  data: string;
};
