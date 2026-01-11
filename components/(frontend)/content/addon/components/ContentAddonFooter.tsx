// icons
import { ArrowRight } from "lucide-react";
import { INRSymbol } from "@/common/constants/symbols";
import { memo } from "react";

function ContentAddonFooter({
  hasAddons,
  cartItemPrice,
  addonsPrice,
  onBookNow
}: {
  hasAddons: boolean;
  cartItemPrice: number;
  addonsPrice: number;
  onBookNow: () => void;
}) {
  return (
    <section className="sticky bottom-0 border-t-[1.5px] bg-ivory-1 border-ash/70 px-3 py-2 sm:px-5 sm:py-2 flex items-center justify-between sm:justify-end sm:gap-2 z-20">
      <div className="sm:hidden grid grid-cols-[auto_auto] gap-x-7 text-charcoal-3/80 text-[15px]">
        <span>Product</span>
        <span>{`${INRSymbol} ${cartItemPrice}`}</span>
        <span>Addons</span>
        <span>{`${INRSymbol} ${addonsPrice}`}</span>
      </div>
      <div className="max-sm:hidden grid grid-cols-[auto_auto_auto_auto] grid-row-[auto_auto] items-center justify-center">
        <span className="text-lg font-medium text-center">
          {`${INRSymbol} ${cartItemPrice}`}
        </span>
        <span className="row-span-2 text-xl px-4">+</span>
        <span className="text-lg font-medium text-center">
          {`${INRSymbol} ${addonsPrice}`}
        </span>
        <span className="row-span-2 text-xl px-4">=</span>
        <span className="text-sm text-charcoal-3/80 text-center leading-none">
          Product
        </span>
        <span className="text-sm text-charcoal-3/80 text-center leading-none">
          Addons
        </span>
      </div>
      <div
        onClick={onBookNow}
        className="relative group flex items-center justify-between min-w-[52dvw] sm:min-w-[220px] p-2.5 px-3 sm:py-2 sm:px-4 col-span-3 bg-charcoal-2 overflow-hidden text-white rounded-md sm:rounded-lg cursor-pointer"
      >
        <div className="flex flex-col items-start">
          <span className="-mb-0.5">{`${INRSymbol} ${cartItemPrice + addonsPrice}`}</span>
          <span className="text-sienna-3/80 text-[11px]">TOTAL</span>
        </div>
        <div className="flex items-center justify-end gap-1 sm:gap-2 transition-all duration-200 sm:group-hover:gap-3">
          <span>{hasAddons ? "Proceed" : "Skip"}</span>
          <ArrowRight
            strokeWidth={2}
            height={16}
            width={16}
            className="sm:hidden"
          />
          <ArrowRight
            strokeWidth={2.5}
            height={17}
            width={17}
            className="max-sm:hidden translate-y-[1px]"
          />
        </div>
        <div className="absolute h-full -left-[35%] w-7 scale-y-110 bg-sienna-3/60 opacity-60 rotate-12 blur-md z-30 top-0 animate-shine-infinite-slow" />
      </div>
    </section>
  );
}

export default memo(ContentAddonFooter);
