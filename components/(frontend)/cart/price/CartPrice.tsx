// icons
import { ChevronDown } from "lucide-react";

// constants
import { INRSymbol } from "@/common/constants/symbols";

// hooks
import { useState } from "react";
import { useCart } from "@/hooks/useOptimizedCart/useCart";

// types
import { type CouponDocument } from "@/common/types/documentation/contents/coupon";

export default function CartPrice() {
  // hooks
  const { price, coupon } = useCart();

  // states
  const [showBreakdown, setShowBreakdown] = useState(false);

  return (
    <div
      className={
        "px-3 min-[1350px]:px-0 flex flex-col justify-start gap-6 lg:!pl-7 lg:border-l border-charcoal-3/20 lg:max-w-[700px] pb-3 lg:row-start-2 lg:col-start-2 lg:row-span-2 lg:min-h-fit lg:pb-0"
      }
    >
      <span
        id="__cartPrice__"
        className="font-medium text-sm text-charcoal-3/80 pt-1.5"
      >
        Total Summary
      </span>
      <section
        className={`rounded-2xl max-lg:shadow-light lg:border lg:border-charcoal-3/25 bg-ivory-1 shadow-md px-4 md:px-5 py-4 md:py-5 flex flex-col justify-start gap-2`}
      >
        <div className="flex items-center justify-between">
          <span>Products Price</span>
          <span>{`${INRSymbol} ${price.content + price.customization}`}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Add-ons Price</span>
          <span>{`${INRSymbol} ${price.addon}`}</span>
        </div>
        {Boolean(price.couponDiscount) && (
          <div className="flex items-center justify-between font-medium text-blue-500">
            <span>Coupon - ({(coupon as CouponDocument)?.code})</span>
            <span>{`- ${INRSymbol} ${price.couponDiscount}`}</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span>Delivery Charges</span>
          <span>{`${INRSymbol} ${price.deliveryCharge}`}</span>
        </div>
        <div className="h-px bg-charcoal-3/30 my-1.5" />
        <div className="flex items-center justify-between mt-1 font-semibold text-green-600">
          <span>Total Amount</span>
          <span>{`${INRSymbol} ${price.total}`}</span>
        </div>

        {price.due > 0 ? (
          <>
            <div className="h-[0.5px] bg-charcoal-3/30 my-1.5" />
            <div className="flex items-center justify-between font-medium">
              <span>Amount to Pay</span>
              <span>{`${INRSymbol} ${price.payable}`}</span>
            </div>

            <div
              onClick={() => {
                setShowBreakdown(!showBreakdown);
              }}
              className="cursor-pointer bg-ash/30 border border-ash/70 text-charcoal-3/70 w-fit rounded-md px-2 py-[1px] text-xs flex items-center justify-center gap-1"
            >
              <span>See how its calculated</span>
              <span>
                <ChevronDown
                  strokeWidth={1.5}
                  width={16}
                  fill="#545454"
                  stroke="#fff0"
                  className={`transition-all duration-300 ${showBreakdown ? "rotate-180" : ""}`}
                />
              </span>
            </div>
            <div
              className={`bg-ash/20 transition-all duration-300 text-xs text-charcoal-3/70 mb-1 rounded-ss-none px-4 py-2.5 space-y-1 rounded-xl ${showBreakdown ? "" : "hidden"}`}
            >
              <div className="flex items-center justify-between">
                <span>
                  {"Base Items "}
                  <span className="font-semibold">
                    - {price.paymentPercentage}% applied
                  </span>
                </span>
                <span>
                  {`${INRSymbol} ${Math.ceil(
                    price.content * (price.paymentPercentage / 100)
                  )}`}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>
                  Addons <span className="font-semibold">- Full Payment</span>
                </span>
                <span>{`${INRSymbol} ${price.addon}`}</span>
              </div>
              <div className="flex items-center justify-between pb-1">
                <span>
                  {"Convenience Fee "}
                  <span className="font-semibold">- Full Payment</span>
                </span>
                <span>{`${INRSymbol} ${price.deliveryCharge}`}</span>
              </div>
              <div className="h-[1px] bg-ash/70 w-full" />
              <div className="pt-1 flex items-center justify-between font-medium text-sm">
                <span>Total</span>
                <span>{`${INRSymbol} ${price.payable}`}</span>
              </div>
            </div>

            <div className="flex items-center justify-between font-medium text-red-400">
              <span>Amount Due</span>
              <span>{`${INRSymbol} ${price.due}`}</span>
            </div>
          </>
        ) : (
          <></>
        )}
      </section>
    </div>
  );
}
