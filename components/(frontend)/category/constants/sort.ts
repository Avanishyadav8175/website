// types
import { type CategoryPageSort } from "../types/sort";

export const CATEGORY_PAGE_SORT_OPTIONS: {
  label: string;
  value: CategoryPageSort;
}[] = [
  { label: "Popularity", value: "popularity" },
  { label: "Latest", value: "latest" },
  { label: "High to Low", value: "high-to-low" },
  { label: "Low to High", value: "low-to-high" }
];
