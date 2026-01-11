// icons
import { ChevronRight, CircleCheck } from "lucide-react";

// constants
import { INRSymbol } from "@/common/constants/symbols";

// hooks
import { useCart } from "@/hooks/useOptimizedCart/useCart";

export default function CartCouponPreviewApplied({
  onChangeShowCoupons,
  onRemoveCoupon
}: {
  onChangeShowCoupons: (showCoupons: boolean) => void;
  onRemoveCoupon: () => void;
}) {
  // hooks
  const {
    price: { couponDiscount }
  } = useCart();

  return (
    <div
      className={`rounded-xl bg-blue-100/70 border-blue-300/80 text-blue-500 border font-medium *:px-3 pt-2.5 text-sm flex flex-col justify-start transition-all duration-300`}
    >
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-start justify-start gap-2">
          <span>
            <CircleCheck
              strokeWidth="2"
              fill="#3b82f6"
              stroke="#fff"
              width={16}
              className={`scale-110 -translate-y-[2px]`}
            />
          </span>
          <span className="flex flex-col justify-start">
            <span>
              {`You saved ${INRSymbol} ${couponDiscount} with this code`}
            </span>
            <span className="text-xs text-charcoal-3/50 py-0.5">
              Coupon Applied
            </span>
          </span>
        </div>
        <div
          onClick={onRemoveCoupon}
          className="text-red-700/80 transition-all duration-300 hover:brightness-90 hover:underline hover:underline-offset-2 cursor-pointer"
        >
          Remove
        </div>
      </div>
      <div
        onClick={() => {
          onChangeShowCoupons(true);
        }}
        className={`flex font-normal items-center cursor-pointer justify-center pb-2.5 gap-1.5 border-t border-blue-300/50 pt-2.5 transition-all duration-300 hover:gap-2.5`}
      >
        <span>Select another coupon</span>
        <ChevronRight
          strokeWidth={2}
          width={15}
          className="translate-y-[1px]"
        />
      </div>
    </div>
  );
}
