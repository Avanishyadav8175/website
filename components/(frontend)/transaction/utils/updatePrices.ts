import {
  CartItemType,
  TransactionPriceSummaryType
} from "@/components/pages/(frontend)/Transaction/Cart/CartWithHook";
import { CartItemChoiceType } from "../cart/static/types";
import { SetStateType } from "@/common/types/reactTypes";

export const updatePrices = ({
  cartItems,
  couponDiscount,
  itemChoices,
  platformFee,
  stateToUpdate
}: {
  cartItems: CartItemType[];
  itemChoices: CartItemChoiceType[];
  couponDiscount: number;
  platformFee: number;
  stateToUpdate: SetStateType<TransactionPriceSummaryType>;
}) => {
  stateToUpdate((prev) => ({
    base: cartItems
      .map(
        ({ _id, pricePerUnit }) =>
          pricePerUnit *
          (itemChoices.find((choice) => choice._id === _id)?.count || 0)
      )
      .reduce((total, num) => (total += num), 0),

    addon: itemChoices
      .map(({ addons }) =>
        addons
          .map(({ count, pricePerUnit }) => count * pricePerUnit)
          .reduce((total, num) => (total += num), 0)
      )
      .reduce((sum, num) => (sum += num), 0),

    coupon: couponDiscount || 0,
    platform: platformFee,
    paymentPercentage: prev.paymentPercentage
  }));
};
