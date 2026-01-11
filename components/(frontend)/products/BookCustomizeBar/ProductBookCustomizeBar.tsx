"use client";
import { PencilIcon } from "lucide-react";
import FrontendProductEarliestDeliveryBy from "../EarliestDeliveryBy/ProductEarliestDeliveryBy";
import { ShineAnimation } from "../../global/ShineAnimation/ShineAnimation";

export default function ProductBookCustomizeBar({
  onCustomize,
  onBook,
  disabled
}: {
  onCustomize: () => void;
  onBook: () => void;
  disabled: boolean;
}) {
  return (
    <>
      {/* CUSTOMIZE ---------------------------------------------------- */}
      <div
        className={`${disabled ? "brightness-75 opacity-70" : " cursor-pointer brightness-100 opacity-100"} relative group text-moss border border-moss px-3 py-3 sm:py-3.5 rounded-xl sm:rounded-xl text-lg text-center sm:w-[236px] whitespace-nowrap transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2`}
        onClick={disabled ? () => {} : onCustomize}
      >
        <span>Customize</span>
        <PencilIcon
          width={16}
          height={16}
        />
        {/* <ShineAnimation className="bg-charcoal-3/25" /> */}

        <div className="absolute text-xs -top-2.5 left-1/2 -translate-x-1/2 bg-neutral-500 text-white px-4 py-0.5 rounded-full">
          Get it Personalized
        </div>
      </div>

      {/* BOOK NOW ---------------------------------------------------- */}
      <div
        className={`${disabled ? "brightness-75 opacity-70" : " cursor-pointer brightness-100 opacity-100"} relative group overflow-hidden bg-moss text-ivory-1 px-3 py-3 sm:py-3.5 rounded-xl sm:rounded-xl text-lg text-center sm:w-[236px] whitespace-nowrap transition-all duration-300`}
        onClick={disabled ? () => {} : onBook}
      >
        Book Now
        {!disabled && <ShineAnimation className="bg-ivory/20" />}
      </div>
    </>
  );
}
