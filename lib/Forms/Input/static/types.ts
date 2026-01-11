import { ClassNameType, SetStateType } from "@/common/types/reactTypes";

type ValuesSet<T> = {
  value: T;
  setValue: (newVal: T) => void;
};

type InputLabelType = {
  label: string;
  layoutStyle?: ClassNameType;
  labelStyle?: ClassNameType;
};

export type CustomInputBasicType = {
  name: string;
  isDisabled?: boolean;
  id?: string;
  className?: ClassNameType;
  customValue?: ValuesSet<string>;
  customStyle?: ClassNameType;
  errorStyle?: ClassNameType;
  validStyle?: ClassNameType;
  defaultValue?: string;
  maxLength?: number;
  onFocus?: () => void;
  onBlur?: () => void;
} & (
  | { errorCheck: false }
  | {
      errorCheck: true;
      errorLogic: (currVal: string) => boolean;
    }
) &
  (
    | { validCheck: false }
    | {
        validCheck: true;
        validLogic: (currVal: string) => boolean;
      }
  ) &
  (
    | {
        isRequired: false;
        labelConfig?: InputLabelType;
      }
    | {
        isRequired: true;
        labelConfig: InputLabelType;
      }
  );

export type CustomInputType = CustomInputBasicType &
  (
    | {
        type: "text" | "email" | "password";
        placeholder?: string;
        onChange?: (val: string) => void;
      }
    | {
        type: "number";
        placeholder?: string;
        onChange?: (val: string) => void;
      }
    | { type: "color" }
    | { type: "date" }
    | ({
        type: "dropdown";
        options: { label: string; value: string }[];
        onChange?: (value: string) => void;
      } & (
        | { nullOption: false }
        | { nullOption: true; customInitialValuePlaceholderLabel?: string }
      ))
  );
