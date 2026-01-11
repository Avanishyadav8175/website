import { INRSymbol } from "@/common/constants/symbols";
import { Download, Eye, RotateCcw } from "lucide-react";
import dummyProducts from "../static/dummyProducts.json";

const DUMMY_ITEMS = dummyProducts;

type OrdersRowType = {
  id: string;
  totalAmount: number;
  paymentStatus: "success" | "failed";
  amountDue: number;
  isDelivered: boolean;
  date: string;
};

export default function FrontendOrdersTable({
  data
}: {
  data: Array<OrdersRowType>;
}) {
  return (
    <div className="max-sm:text-sm text-charcoal-3 relative flex flex-col items-start justify-start *:w-device *:sm:w-[54dvw] gap-5 py-4 *:px-3 *:py-3 sm:*:px-5 *:sm:py-4 *:rounded-xl *:bg-ivory-1 *:shadow-sm *:border *:border-neutral-200/80 *:transition-all *:duration-300">
      {data.map(
        (
          { amountDue, id, isDelivered, date, paymentStatus, totalAmount },
          index
        ) => (
          <div
            key={index}
            className={`relative grid grid-cols-[65px_1fr_1fr] sm:grid-cols-[80px_1fr_150px_auto] auto-rows-min gap-x-3.5 ${paymentStatus === "success" ? (amountDue === 0 ? "!bg-gradient-to-r from-ivory-1 from-85% to-green-200/50" : "hover:bg-neutral-50") : "!border-rose-200 !bg-gradient-to-r from-ivory-1 from-85% to-rose-100/80"}  overflow-hidden`}
          >
            {/* IMAGE ------------------------------ */}
            <div className="aspect-square rounded-lg bg-charcoal-3/30 overflow-hidden relative row-span-3 row-start-1 col-start-1"></div>

            {/* PRODUCT NAME ------------------------------ */}
            <span className="font-medium text-lg max-sm:col-start-2 max-sm:row-start-1 max-sm:col-span-2 line-clamp-1">
              {DUMMY_ITEMS[index % DUMMY_ITEMS.length]}
            </span>

            {/* PRICE ------------------------------ */}
            <span className="font-medium col-start-2 max-sm:col-span-2 z-20 max-sm:row-start-2">
              {INRSymbol}
              {totalAmount}
              {amountDue > 0 && paymentStatus === "success" && (
                <span className="pl-3.5 text-red-500">
                  (Due: {INRSymbol}
                  {amountDue})
                </span>
              )}
            </span>

            {/* DATE ------------------------------ */}
            <span className="text-sm text-charcoal-3/50 col-start-2 max-sm:row-start-3">
              Date: {date}
            </span>

            {/* PAID / UNPAID STAMP ---------------------------- */}
            <div
              className={`flex items-center justify-center max-sm:absolute max-sm:bottom-2.5 max-sm:right-2.5 w-16 h-16 sm:w-20 sm:h-20 sm:col-start-4 sm:row-start-1 sm:row-span-4 ${paymentStatus === "success" && amountDue === 0 ? "scale-[1.2] saturate-[12] hue-rotate-[240deg] opacity-80" : "opacity-70"}`}
            >
              {paymentStatus === "success" && amountDue === 0 ? (
                <span>Paid</span>
              ) : paymentStatus === "failed" ? (
                <span>Failed</span>
              ) : (
                <></>
              )}
            </div>
            <div className="flex flex-row sm:flex-col justify-start sm:justify-center items-center max-sm:pt-4 max-sm:pb-1 max-sm:gap-x-1.5 row-start-4 col-start-1 max-sm:col-span-2 sm:row-start-1 sm:row-span-4 sm:col-start-3">
              <div className="text-xs sm:text-sm flex items-center justify-center gap-1.5 max-sm:px-3 px-3.5 py-1 sm:py-1 max-sm:border max-sm:border-charcoal-3/30 max-sm:text-charcoal-3/70 rounded-full sm:rounded-lg transition-all duration-300 cursor-pointer hover:bg-charcoal-3/5">
                <Eye
                  strokeWidth={1.5}
                  width={16}
                  height={16}
                  className="max-sm:scale-90"
                />
                <span>Details</span>
              </div>
              <div className="text-xs sm:text-sm flex items-center justify-center gap-1.5 px-3 py-1 sm:py-1 max-sm:border max-sm:border-charcoal-3/30 max-sm:text-charcoal-3/70 rounded-full sm:rounded-lg transition-all duration-300 cursor-pointer hover:bg-charcoal-3/5">
                <Download
                  strokeWidth={1.5}
                  width={16}
                  height={16}
                  className="max-sm:scale-90"
                />
                <span>Download</span>
              </div>
              {paymentStatus === "failed" && (
                <div className="font-medium text-blue-600 text-xs sm:text-sm flex items-center justify-center gap-1.5 px-3 py-1 sm:py-1 max-sm:border max-sm:border-blue-500/50 rounded-full sm:rounded-lg cursor-pointer hover:bg-blue-100 hover:underline hover:underline-offset-2">
                  <RotateCcw
                    width={16}
                    height={16}
                    className="max-sm:scale-90"
                  />
                  <span>Retry</span>
                </div>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
}
