// constants
import { CART_LOCAL_KEY } from "@/common/constants/localStorageKeys";

// utils
import {
  deleteLocalStorage,
  getLocalStorage,
  setLocalStorage
} from "@/common/utils/storage/local";

// types
import { type CartDocument } from "@/common/types/documentation/dynamic/cart";

export const setLocalStorageCart = (cart: CartDocument): void => {
  setLocalStorage({
    key: CART_LOCAL_KEY,
    value: cart
  });
};

export const getLocalStorageCart = (): CartDocument | null => {
  return getLocalStorage({
    key: CART_LOCAL_KEY
  });
};

export const deleteLocalStorageCart = (): void => {
  deleteLocalStorage({
    key: CART_LOCAL_KEY
  });
};
