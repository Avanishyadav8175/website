// constants
import {
  CART_COUPON_LOCAL_KEY,
  CART_ITEMS_LOCAL_KEY,
  CART_ITEM_CHOICES_LOCAL_KEY,
  CART_DELIVERY_DETAILS_LOCAL_KEY,
  CART_DOCUMENTS_LOCAL_KEY,
  CART_PAYMENT_PERCENTAGE_LOCAL_KEY
} from "@/common/constants/localStorageKeys";
import { CouponDocument } from "@/common/types/documentation/contents/coupon";
import { CartItemDocument } from "@/common/types/documentation/nestedDocuments/cartItem";

// utils
import { getLocalStorage, setLocalStorage } from "@/common/utils/storage/local";
import { CartItemChoiceType } from "@/components/(frontend)/transaction/cart/static/types";

// types
import {
  CartItemType,
  DeliveryDetailsType,
  TransactionPriceSummaryType
} from "@/components/pages/(frontend)/Transaction/Cart/CartWithHook";

// CART ITEMS ----------------------------------
export const setLocalStorageCartItems = (items: CartItemType[]): void => {
  setLocalStorage({
    key: CART_ITEMS_LOCAL_KEY,
    value: items
  });
};

export const getLocalStorageCartItems = (): CartItemType[] | null => {
  return getLocalStorage({
    key: CART_ITEMS_LOCAL_KEY
  });
};

// CART ITEM CHOICES ----------------------------------
export const setLocalStorageCartItemChoices = (
  items: CartItemChoiceType[]
): void => {
  setLocalStorage({
    key: CART_ITEM_CHOICES_LOCAL_KEY,
    value: items
  });
};

export const getLocalStorageCartItemChoices = ():
  | CartItemChoiceType[]
  | null => {
  return getLocalStorage({
    key: CART_ITEM_CHOICES_LOCAL_KEY
  });
};

// CART PAYMENT PERCENTAGE ----------------------------------
export const setLocalStorageCartPrice = (paymentPercentage: number): void => {
  setLocalStorage({
    key: CART_PAYMENT_PERCENTAGE_LOCAL_KEY,
    value: paymentPercentage
  });
};

export const getLocalStorageCartPrice = (): number | null => {
  return getLocalStorage({
    key: CART_PAYMENT_PERCENTAGE_LOCAL_KEY
  });
};

// CART DELIVERY DETAILS ----------------------------------
export const setLocalStorageCartDeliveryDetails = (
  details: DeliveryDetailsType
): void => {
  setLocalStorage({
    key: CART_DELIVERY_DETAILS_LOCAL_KEY,
    value: details
  });
};

export const getLocalStorageCartDeliveryDetails =
  (): DeliveryDetailsType | null => {
    return getLocalStorage({
      key: CART_DELIVERY_DETAILS_LOCAL_KEY
    });
  };

// CART COUPON ----------------------------------
export const setLocalStorageCartCoupon = (
  details: CouponDocument | null
): void => {
  setLocalStorage({
    key: CART_COUPON_LOCAL_KEY,
    value: details
  });
};

export const getLocalStorageCartCoupon = (): CouponDocument | null => {
  return getLocalStorage({
    key: CART_COUPON_LOCAL_KEY
  });
};

// CART DISTINCT CONTENT DOCUMENTS ----------------------
export const setLocalStorageContentDocuments = (
  cartItems: CartItemDocument[]
) => {
  let hashmap: Record<string, boolean> = {};
  cartItems.forEach(({ _id }) => (hashmap[_id as string] = true));

  const distinctItems: CartItemDocument[] = Object.keys(hashmap)
    .map((id) => cartItems.find(({ _id }) => (_id as string) === id))
    .filter((x) => x !== undefined);

  setLocalStorage({ key: CART_DOCUMENTS_LOCAL_KEY, value: distinctItems });
};

export const getLocalStorageContentDocuments = ():
  | CartItemDocument[]
  | null => {
  return getLocalStorage({ key: CART_DOCUMENTS_LOCAL_KEY });
};
