import { type Document } from "mongoose";
import { type DocumentKeyOption } from "@/common/types/utils";
import {
  type FilterOption,
  type SelectOption,
  type SortOption
} from "@/common/types/inputs";
import { type FilterOptionWithKeywordOptions } from "@/common/types/redux/filterOption";
import { type ToastType } from "@/common/types/toast";

export type QueryInitialState<T extends Document> = {
  options: {
    filter: FilterOption<T>[];
    sort: SortOption<T>[];
  };
  default: {
    filter: "";
    sort: DocumentKeyOption<T>;
    order: "asc" | "desc";
  };
};

export type QueryState = {
  options: {
    filter: SelectOption[];
    sort: SelectOption[];
  };
  default: {
    filter: "";
    sort: string;
    order: "asc" | "desc";
  };
};

export type QueryReturn = {
  options: {
    filter: FilterOptionWithKeywordOptions[];
    sort: SelectOption[];
  };
  default: {
    filter: string;
    sort: string;
    order: "asc" | "desc";
  };
};

export interface SliceInitialState<T extends Document> {
  documentList: T[];
  documents: T[];
  query: QueryInitialState<T>;
  status: "idle" | "pending" | "fulfilled" | "rejected";
  notifications: ToastType[];
}

export interface SliceState<T> {
  documentList: T[];
  documents: T[];
  query: QueryState;
  status: "idle" | "pending" | "fulfilled" | "rejected";
  notifications: ToastType[];
}
