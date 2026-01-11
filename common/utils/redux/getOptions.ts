// types
import { type Document as MongooseDocument } from "mongoose";
import {
  type FilterOption,
  type SelectOption,
  type SortOption
} from "@/common/types/inputs";

export const getFilterByOptions = <Document extends MongooseDocument>(
  filterByOptions: FilterOption<Document>[]
) => filterByOptions.map((option) => option as SelectOption);

export const getSortByOptions = <Document extends MongooseDocument>(
  sortByOptions: SortOption<Document>[]
) => sortByOptions.map((option) => option as SelectOption);
