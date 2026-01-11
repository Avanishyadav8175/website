// constants
import { SORT_BY_LOCAL_KEY } from "@/common/constants/localStorageKeys";

// utils
import {
  deleteLocalStorage,
  getLocalStorage,
  setLocalStorage
} from "@/common/utils/storage/local";

export const setLocalStorageSortBy = (sortBy: string): void => {
  setLocalStorage({
    key: SORT_BY_LOCAL_KEY,
    value: sortBy
  });
};

export const getLocalStorageSortBy = (): string | null => {
  const sortBy = getLocalStorage<string>({
    key: SORT_BY_LOCAL_KEY
  });

  if (
    sortBy &&
    (sortBy.split(":")[1] === "latest" ||
      sortBy.split(":")[1] === "high-to-low" ||
      sortBy.split(":")[1] === "low-to-high")
  ) {
    return sortBy;
  }

  return null;
};

export const deleteLocalStorageSortBy = (): void => {
  deleteLocalStorage({
    key: SORT_BY_LOCAL_KEY
  });
};
