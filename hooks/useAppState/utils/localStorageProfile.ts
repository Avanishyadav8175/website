// constants
import { USER_PROFILE_LOCAL_KEY } from "@/common/constants/localStorageKeys";

// utils
import {
  deleteLocalStorage,
  getLocalStorage,
  setLocalStorage
} from "@/common/utils/storage/local";

// types
import { type CustomerDocument } from "@/common/types/documentation/users/customer";

export const setLocalStorageProfile = (customer: CustomerDocument): void => {
  setLocalStorage({
    key: USER_PROFILE_LOCAL_KEY,
    value: customer
  });
};

export const getLocalStorageProfile = (): CustomerDocument | null => {
  return getLocalStorage({
    key: USER_PROFILE_LOCAL_KEY
  });
};

export const deleteLocalStorageProfile = (): void => {
  deleteLocalStorage({
    key: USER_PROFILE_LOCAL_KEY
  });
};
