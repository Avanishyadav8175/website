// constants
import { USER_AUTH_LOCAL_KEY } from "@/common/constants/localStorageKeys";

// utils
import {
  deleteLocalStorage,
  getLocalStorage,
  setLocalStorage
} from "@/common/utils/storage/local";

// types
import { type Auth } from "../types/auth";

export const setLocalStorageAuth = (auth: Auth): void => {
  setLocalStorage({
    key: USER_AUTH_LOCAL_KEY,
    value: auth
  });
};

export const getLocalStorageAuth = (): Auth | null => {
  return getLocalStorage({
    key: USER_AUTH_LOCAL_KEY
  });
};

export const deleteLocalStorageAuth = (): void => {
  deleteLocalStorage({
    key: USER_AUTH_LOCAL_KEY
  });
};
