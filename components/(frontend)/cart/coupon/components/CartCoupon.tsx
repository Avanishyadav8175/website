// icons
import { CheckCheck } from "lucide-react";

// constants
import { INRSymbol } from "@/common/constants/symbols";

// hooks
import { useState } from "react";
import { useCart } from "@/hooks/useOptimizedCart/useCart";

// types
import { type CouponDocument } from "@/common/types/documentation/contents/coupon";

export default function CartCoupon({
  coupon,
  isApplicable,
  isApplied,
  onApply
}: {
  coupon: CouponDocument;
  isApplicable: boolean;
  isApplied: boolean;
  onApply: () => void;
}) {
  // hooks
  const {
    price: { content, customization, deliveryCharge }
  } = useCart();

  // states
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // variables
  const orderAmount = content + customization;
  const header =
    coupon.type === "discount" && coupon.discount
      ? coupon.discount.type === "fixed"
        ? "FLAT OFF"
        : `${coupon.discount.percentage}% OFF`
      : "FREE DELIVERY";

  const saveAmount =
    coupon.type === "discount" && coupon.discount
      ? coupon.discount.type === "percentage" && coupon.discount?.percentage
        ? Math.min(
            coupon.discount.limit,
            Math.ceil((orderAmount * coupon.discount.percentage) / 100)
          )
        : coupon.discount.limit
      : deliveryCharge;

  const description = `Use code ${coupon.code} and get ${
    coupon.type === "discount" && coupon.discount
      ? coupon.discount.type === "percentage" && coupon.discount?.percentage
        ? `${coupon.discount.percentage}% off on this order upto ${INRSymbol}${coupon.discount.limit} above ${INRSymbol}${coupon.minimumOrderAmount}`
        : `Flat ${INRSymbol}${coupon.discount.limit} off on this order above ${INRSymbol}${coupon.minimumOrderAmount}`
      : "Free Delivery on this order"
  }`;

  return (
    <div
      className={`rounded-3xl bg-ivory-1 relative  grid grid-cols-[50px_auto] grid-rows-[repeat(4,auto)] transition-all duration-300`}
    >
      <div
        className={`relative grid *:row-start-1 *:col-start-1 ${isApplicable ? "bg-sienna-2" : "bg-charcoal-3/30"} overflow-hidden text-white row-span-4 place-items-center rounded-l-3xl`}
      >
        <div className="whitespace-nowrap relative font-extrabold h-full aspect-square -rotate-90 flex items-center justify-center -left-1/2 translate-x-[calc(calc(50px_/_2)_+_2px)] tracking-wider">
          {header}
        </div>
        <div className="flex flex-col justify-center items-center gap-2 *:rounded-full *:aspect-square *:bg-ivory-2 *:w-3.5 justify-self-start -translate-x-[7px] z-[999]">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className={`pl-3 pr-4 pt-2.5 flex items-stretch`}>
        <div className="pb-4 grid grid-cols-[1fr_auto] grid-rows-[repeat(2,auto)] w-full items-center border-b-[1.5px] border-dashed border-charcoal-3/15 text-charcoal-3/80">
          <span className="pt-1.5 pb-1 font-semibold tracking-wide text-lg">
            {coupon.code}
          </span>
          <span
            onClick={isApplicable ? onApply : () => {}}
            className={`font-medium ${isApplied ? "text-green-600" : "text-sienna"}  cursor-pointer transition-all duration-300 hover:brightness-75 flex items-center justify-end gap-1`}
          >
            {isApplicable ? (
              isApplied ? (
                <>
                  <CheckCheck
                    strokeWidth={1.5}
                    width={18}
                  />
                  <span>Applied</span>
                </>
              ) : (
                <>Apply</>
              )
            ) : (
              <></>
            )}
          </span>
          <span
            className={`col-span-2 ${isApplicable ? "text-green-600" : "text-red-500"} font-medium leading-none text-sm`}
          >
            {isApplicable
              ? `Save ${INRSymbol}${saveAmount} on this offer!`
              : `Add items worth ${INRSymbol}${coupon.minimumOrderAmount - orderAmount} more to unlock`}
          </span>
        </div>
      </div>
      <div className="px-2.5 py-2 pr-10 flex items-center text-sm text-charcoal-3/50">
        {description}
      </div>
      <div
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
        className={`px-2.5 ${isExpanded ? "pb-2.5" : "pb-4"} cursor-pointer w-fit pt-1.5 font-medium text-charcoal-2/70 flex items-center justify-start gap-1.5`}
      >
        <span>{isExpanded ? "- LESS" : "+ MORE"}</span>
      </div>
      {isExpanded && (
        <div className={`text-sm px-3.5 pl-6 pb-4 text-charcoal-3/50`}>
          {coupon.description}
        </div>
      )}
    </div>
  );
}
