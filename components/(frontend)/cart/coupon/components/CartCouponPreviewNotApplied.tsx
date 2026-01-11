// icons
import { BadgePercent, TicketCheck } from "lucide-react";

export default function CartCouponPreviewNotApplied({
  onChangeShowCoupons
}: {
  onChangeShowCoupons: (showCoupons: boolean) => void;
}) {
  return (
    <div
      className="cursor-pointer rounded-xl bg-purple-200/40 border border-purple-300 hover:bg-purple-200/60 font-medium px-3 py-2.5 text-sm flex items-center justify-between gap-2.5 text-purple-500 transition-all duration-300"
      onClick={() => {
        onChangeShowCoupons(true);
      }}
    >
      <div className="flex items-center justify-start gap-2.5">
        <TicketCheck
          strokeWidth={1.5}
          className="text-purple-600"
        />
        <span>Coupons available</span>
      </div>
      {/* <div className="text-[13px] text-charcoal-3/50">View Offers</div> */}
    </div>
  );
}
