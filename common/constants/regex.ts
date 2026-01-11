export const REGEX_TEST = {
  EMAIL: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  NAME: /^[a-zA-Z\s'-]*$/,
  PASSWORD: /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=_]).*$/,
  MOBILE: /^(?!0+$)\d+$/
};

export const GST_REGEX =
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

export const UPI_REGEX = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;

export const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;

export const PRODUCT_PAGE_REGEX =
  /(https|http):\/\/[\w.:-]+\/product\/[\w\/.:-]+$/;

export const CATEGORY_PAGE_REGEX =
  /(https|http):\/\/[\w.:-]+\/[\w.-]{3,}(\/[\w.-:]*)*$/;

export const DYNAMIC_PAGE_REGEX = /(https|http):\/\/[\w.:-]+\/more\/[\w\/.:-]+$/;

export const CART_PAGE_REGEX = /(https|http):\/\/[\w.:-]+\/cart\/?$/;
