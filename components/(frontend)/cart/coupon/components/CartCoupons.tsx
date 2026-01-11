// icons
import { TicketX } from "lucide-react";

// constants
import { INRSymbol } from "@/common/constants/symbols";

// hooks
import { useState } from "react";
import { useCart } from "@/hooks/useOptimizedCart/useCart";

// components
import CartCoupon from "./CartCoupon";

// types
import { type ChangeEvent } from "react";
import { type CouponDocument } from "@/common/types/documentation/contents/coupon";

export default function CartCoupons({
  coupons,
  onApply
}: {
  coupons: CouponDocument[];
  onApply: (coupon: CouponDocument) => void;
}) {
  // hooks
  const {
    price: { content, customization },
    coupon: appliedCoupon
  } = useCart();

  // states
  const [keyword, setKeyword] = useState<string>("");

  // variables
  const filteredCoupons = keyword
    ? coupons.filter(({ code }) =>
        code.toLowerCase().startsWith(keyword.toLowerCase())
      )
    : coupons;

  const orderAmount = content + customization;

  return (
    <div className="*:max-sm:px-3.5 *:sm:px-4 flex flex-col justify-start min-h-[80dvh] max-h-[80dvh] max-sm:max-h-[95dvh] max-sm:bg-[#f2f2f2] rounded-t-3xl sm:rounded-t-2xl">
      <div className="bg-ivory-1 max-sm:pt-6 max-sm:pb-2.5 pt-4 pb-3 rounded-t-3xl sm:rounded-t-2xl flex flex-col justify-start">
        <span className="font-medium sm:text-lg text-charcoal-3/90">
          Apply Coupon
        </span>
        <span className="text-charcoal-3/50 text-sm">
          {`Cart Total: ${INRSymbol} ${orderAmount}`}
        </span>
        <div className="bg-charcoal-3/5 border border-charcoal-3/5 px-3.5 py-2.5 mt-2 mb-0.5 rounded-2xl grid grid-cols-[1fr_auto]">
          <input
            type="text"
            placeholder="Enter Coupon Code"
            value={keyword}
            onChange={({
              target: { value: keyword }
            }: ChangeEvent<HTMLInputElement>) => {
              setKeyword(keyword);
            }}
            className="bg-transparent outline-none border-none placeholder:text-charcoal-3/30 text-sm"
          />
        </div>
      </div>
      <div
        className={`bg-ivory-2 h-full pb-4 flex flex-col justify-start gap-3.5 overflow-y-scroll scrollbar-hide sm:rounded-b-2xl pt-6`}
      >
        {filteredCoupons.length ? (
          filteredCoupons
            .sort((a, b) => {
              const firstApplicable =
                a.type === "discount" && a.minimumOrderAmount > orderAmount;

              const secondApplicable =
                b.type === "discount" && b.minimumOrderAmount > orderAmount;

              return (!firstApplicable ? -1 : 0) - (!secondApplicable ? -1 : 0);
            })
            .map((coupon) => (
              <CartCoupon
                key={coupon._id as string}
                coupon={coupon}
                isApplicable={coupon.minimumOrderAmount <= orderAmount}
                isApplied={coupon._id === appliedCoupon?._id}
                onApply={() => {
                  onApply(coupon);
                }}
              />
            ))
        ) : (
          <div className="text-charcoal-3/75 grid place-items-center grid-cols-1 py-12 gap-2">
            <TicketX
              width={44}
              height={44}
              strokeWidth={1.5}
            />
            <span>No coupons to apply</span>
          </div>
        )}
      </div>
    </div>
  );
}
