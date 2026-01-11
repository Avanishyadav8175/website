import { ClassNameType } from "@/common/types/reactTypes";

type ValuesSet<T> = {
  value: T;
  setValue: (newVal: T) => void;
};

type InputLabelType = {
  label: string;
  layoutStyle: ClassNameType;
  labelStyle: ClassNameType;
};

export type CustomTextareaType = {
  className?: ClassNameType;
  id?: string;
  name: string;
  placeholder?: string;
  isDisabled?: boolean;
  longer?: boolean;
  maxLen?: number;
  customStyle?: ClassNameType;
  errorStyle?: ClassNameType;
  validStyle?: ClassNameType;
} & (
  | { errorCheck?: false }
  | {
      errorCheck: true;
      errorLogic: (currVal: string) => boolean;
    }
) &
  (
    | { validCheck?: false }
    | {
        validCheck: true;
        validLogic: (currVal: string) => boolean;
      }
  ) &
  (
    | {
        isRequired?: false;
        labelConfig?: InputLabelType;
      }
    | {
        isRequired?: true;
        labelConfig: InputLabelType;
      }
  ) &
  (
    | {
        isList?: false;
        defaultValue: string;
        customValue?: undefined;
      }
    | {
        isList?: false;
        defaultValue?: undefined;
        customValue: ValuesSet<string>;
      }
    | {
        isList: true;
        defaultValue: string[];
        customValue?: undefined;
      }
    | {
        isList: true;
        defaultValue?: undefined;
        customValue: ValuesSet<string[]>;
      }
  );
