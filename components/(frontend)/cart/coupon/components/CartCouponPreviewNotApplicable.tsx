// icons
import { BadgePercent } from "lucide-react";

export default function CartCouponPreviewNotApplicable() {
  return (
    <div className="cursor-pointer rounded-xl bg-slate-200/40 border opacity-75 border-slate-300 hover:bg-slate-200/30 font-medium px-3 py-2.5 text-sm flex items-center justify-between gap-2.5 text-slate-500 transition-all duration-300">
      <div className="flex items-center justify-start gap-2.5">
        <BadgePercent
          strokeWidth={1.5}
          fill="#64748b"
          stroke="#dbeafe"
        />
        <span className="flex flex-col items-start justify-center">
          <span>Coupons</span>
          <span className="text-[12px] text-red-400">
            Applicable for full payment only
          </span>
        </span>
      </div>
      <div />
    </div>
  );
}
