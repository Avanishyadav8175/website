// icons
import { BadgeIndianRupeeIcon } from "lucide-react";

// hooks
import { useCart } from "@/hooks/useOptimizedCart/useCart";

// constants
const CHECKED =
  "rounded-full aspect-square transition-all duration-300 bg-green-600 ring-green-600 ring-2 ring-offset-2 w-2";
const UNCHECKED =
  "rounded-full aspect-square transition-all duration-300 bg-ash/70 w-3";

export default function CartPaymentPercentage() {
  const { price, maxPaymentPercentage, onChangePaymentPercentage } = useCart();

  const { paymentPercentage } = price;

  if (maxPaymentPercentage === 100) {
    return <></>;
  }

  return (
    <div
      className={
        "px-3 min-[1350px]:px-0 max-md:pt-3 mb-3 lg:row-start-6 lg:sticky"
      }
    >
      <div className="cursor-pointer rounded-2xl border border-charcoal-3/25 bg-ivory-1 max-lg:shadow-light font-medium p-4 flex flex-col justify-start gap-2.5 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-1">
            <BadgeIndianRupeeIcon
              strokeWidth={1.5}
              width={20}
            />
            <span>Payment Options</span>
          </div>
          <div className="flex items-center justify-end gap-3.5 *:min-w-[60px]">
            <div
              className="flex items-center justify-end gap-2"
              onClick={() => {
                onChangePaymentPercentage(maxPaymentPercentage);
              }}
            >
              <div
                className={
                  paymentPercentage === maxPaymentPercentage
                    ? CHECKED
                    : UNCHECKED
                }
              />
              <span>{maxPaymentPercentage}%</span>
            </div>
            <div
              className="flex items-center justify-end gap-2"
              onClick={() => {
                onChangePaymentPercentage(100);
              }}
            >
              <div
                className={paymentPercentage === 100 ? CHECKED : UNCHECKED}
              />
              <span>100%</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-start text-rose-500/80 text-xs">
          {`Note: Coupon will not be applicable for ${maxPaymentPercentage}% Payment`}
        </div>
      </div>
    </div>
  );
}
