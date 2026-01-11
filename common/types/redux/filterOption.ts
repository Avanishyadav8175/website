// types
import { type Document } from "mongoose";
import { type DocumentKeyOption } from "@/common/types/utils";
import { type SelectOption } from "@/common/types/inputs";

export type FilterKeywordOptions<T extends Document> = {
  [key in DocumentKeyOption<T>]?: SelectOption[];
};

export type FilterOptionWithKeywordOptions = {
  label: string;
  value: string;
  options: SelectOption[];
};
