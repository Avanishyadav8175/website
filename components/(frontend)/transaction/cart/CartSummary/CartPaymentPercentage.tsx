import { HorizontalSpacing } from "@/components/(frontend)/global/_Spacings/HorizontalSpacings";
import { BadgeIndianRupeeIcon } from "lucide-react";

export default function FrontendCartPaymentPercentageSelector({
  setPercentage,
  partialPercentage,
  selected,
  hideOnDesktop
}: {
  setPercentage: (percentageSelected: number) => void;
  partialPercentage: number;
  selected: number;
  hideOnDesktop?: boolean;
}) {
  return (
    <HorizontalSpacing
      className={`max-md:pt-3 mb-3 sm:row-start-6 sm:sticky ${hideOnDesktop ? "sm:hidden" : ""}`}
    >
      <div className="cursor-pointer rounded-2xl border border-charcoal-3/25 bg-ivory-1 max-sm:shadow-light font-medium p-4 flex flex-col justify-start gap-2.5 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-1">
            <BadgeIndianRupeeIcon
              strokeWidth={1.5}
              width={20}
            />
            <span>Payment Options</span>
          </div>
          <div className="flex items-center justify-end gap-3.5 *:min-w-[60px]">
            {/* PARTIAL PERCENTAGE ----------- */}
            <div
              className="flex items-center justify-end gap-2"
              onClick={() => setPercentage(partialPercentage)}
            >
              <CheckboxCircle active={selected !== 100 ? true : false} />
              <span>{partialPercentage}%</span>
            </div>

            {/* FULL PERCENTAGE ----------- */}
            <div
              className="flex items-center justify-end gap-2"
              onClick={() => setPercentage(100)}
            >
              <CheckboxCircle active={selected === 100 ? true : false} />
              <span>100%</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-start text-rose-500/80 text-xs">
          Note: Coupon will not be applicable for {partialPercentage}% Payment
        </div>
      </div>
    </HorizontalSpacing>
  );
}

const CheckboxCircle = ({ active }: { active: boolean }) => (
  <div
    className={`rounded-full aspect-square transition-all duration-300 ${active ? "bg-green-600 ring-green-600 ring-2 ring-offset-2 w-2" : "bg-ash/70 w-3"}`}
  />
);
