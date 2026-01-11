import { INRSymbol } from "@/common/constants/symbols";
import { HorizontalSpacing } from "../../global/_Spacings/HorizontalSpacings";
import { BadgePercent } from "lucide-react";
import { CartItemChoiceType } from "./static/types";
import { CartItemType } from "@/components/pages/(frontend)/Transaction/Cart/CartWithHook";

export default function CartSavingMsg({
  itemChoices,
  cartItems
}: {
  itemChoices: CartItemChoiceType[];
  cartItems: CartItemType[];
}) {
  const savedAmount: number = cartItems
    .map(({ _id, mrp, pricePerUnit }) => ({
      diff: mrp - pricePerUnit,
      count: itemChoices.find((choice) => choice._id === _id)?.count || 0
    }))
    .reduce((total, { diff, count }) => (total += count * diff), 0);

  if (savedAmount > 0)
    return (
      <HorizontalSpacing className="max-md:pt-3 mb-3 sm:col-start-1 sm:row-start-3 sm:mt-2 sm:mb-4 max-sm:hidden">
        <div className="rounded-xl bg-green-200/60 font-medium px-3 py-2 text-sm flex items-center justify-start gap-2.5 text-green-500">
          <BadgePercent
            strokeWidth={1.5}
            fill="#22c55e"
            stroke="#bbf7d0"
          />
          <span>
            You are saving {INRSymbol}
            {savedAmount} on this order!
          </span>
        </div>
      </HorizontalSpacing>
    );

  return <></>;
}
