// icons
import { BadgePercent } from "lucide-react";

// constants
import { INRSymbol } from "@/common/constants/symbols";
import { IS_MOBILE } from "@/common/constants/mediaQueries";

// hooks
import { useMediaQuery } from "usehooks-ts";
import { useCart } from "@/hooks/useOptimizedCart/useCart";

export default function CartSavingAmount() {
  // hooks
  const isMobile = useMediaQuery(IS_MOBILE);
  const { savingAmount } = useCart();

  return (
    <div
      className={
        isMobile
          ? "bg-ivory-1 sticky top-[44px] z-[800] pb-2.5 px-3.5 border-b border-charcoal-3/15"
          : "px-3 min-[1350px]:px-0 max-md:pt-3 mb-3 sm:col-start-1 sm:row-start-3 sm:mt-2 sm:mb-4"
      }
    >
      <div className="rounded-xl bg-green-200/60 font-medium px-3 py-2 text-sm flex items-center justify-start gap-2.5 text-green-500">
        <BadgePercent
          strokeWidth={1.5}
          fill="#22c55e"
          stroke="#bbf7d0"
        />
        <span>
          {`You are saving ${INRSymbol} ${savingAmount} on this order!`}
        </span>
      </div>
    </div>
  );
}
