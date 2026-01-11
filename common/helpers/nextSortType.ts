import { SortType } from "../types/types";

export const nextSortType = (currType: SortType): SortType => {
  if (currType === "none") return "asc";
  if (currType === "asc") return "desc";
  return "none";
};
