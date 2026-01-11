// constants
import { SEARCH_HISTORY_LOCAL_KEY } from "@/common/constants/localStorageKeys";

// utils
import { getLocalStorage, setLocalStorage } from "@/common/utils/storage/local";

export const setLocalStorageSearchHistory = (keywords: string[]): void => {
  setLocalStorage({
    key: SEARCH_HISTORY_LOCAL_KEY,
    value: keywords
  });
};

export const getLocalStorageSearchHistory = (): string[] | null => {
  return getLocalStorage({
    key: SEARCH_HISTORY_LOCAL_KEY
  });
};
