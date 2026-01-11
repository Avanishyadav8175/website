import { TransactionPriceSummaryType } from "@/components/pages/(frontend)/Transaction/Cart/CartWithHook";

export const getTotalCartAmount = (
  priceSummary: TransactionPriceSummaryType
) => {
  const grandTotal =
    priceSummary.base +
    priceSummary.platform +
    priceSummary.addon -
    (priceSummary.paymentPercentage === 100 ? priceSummary.coupon : 0);

  const payableAmount =
    Math.ceil(priceSummary.base * (priceSummary.paymentPercentage / 100)) +
    priceSummary.platform +
    priceSummary.addon -
    (priceSummary.paymentPercentage === 100 ? priceSummary.coupon : 0);

  const amountDue = Math.floor(
    priceSummary.base * ((100 - priceSummary.paymentPercentage) / 100)
  );

  return {
    grandTotal,
    payableAmount,
    amountDue
  };
};
