import { CartPriceDocument } from "../types/documentation/nestedDocuments/cartPrice";

export const orderPriceSchematics = (priceDoc: CartPriceDocument) => {
  const {
    content,
    addon,
    customization,
    deliveryCharge,
    paymentPercentage,
    couponDiscount
  } = priceDoc;

  return {
    totalPrice:
      content + customization + addon + deliveryCharge - couponDiscount,
    paymentAmount:
      Math.ceil(((content + customization) * paymentPercentage) / 100) +
      addon +
      deliveryCharge -
      couponDiscount,
    remainingAmount:
      Math.floor(
        ((content + customization) * (100 - paymentPercentage)) / 100
      ) +
      addon +
      deliveryCharge -
      couponDiscount
  };
};
