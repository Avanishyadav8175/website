import { ClassNameType } from "@/common/types/reactTypes";

type ValuesSet<T> = {
  values: T[];
  setValues: (newVal: T[]) => void;
};

export type CustomCheckboxType = {
  name: string;
  id?: string;
  className?: ClassNameType;
  customValue?: ValuesSet<string>;
  customStyle?: ClassNameType;
  type: "retro" | "modern" | "billboard";
  minSelect?: number;
  maxSelect?: number;
  label: string;
  layoutStyle: ClassNameType;
  labelStyle: ClassNameType;
  isRequired: boolean;
};
