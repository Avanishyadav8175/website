import { INRSymbol } from "@/common/constants/symbols";
import { HorizontalSpacing } from "@/components/(frontend)/global/_Spacings/HorizontalSpacings";
import { TransactionPriceSummaryType } from "@/components/pages/(frontend)/Transaction/Cart/CartWithHook";
import { getTotalCartAmount } from "../../utils/getTotalCartAmount";
import { ChevronDown } from "lucide-react";
import { SetStateType } from "@/common/types/reactTypes";
import { CouponDocument } from "@/common/types/documentation/contents/coupon";

export default function FrontendCartSummary({
  priceSummary,
  appliedCoupon,
  showHowItWorks,
  setShowHowItWorks,
  hideOnDesktop
}: {
  priceSummary: TransactionPriceSummaryType;
  appliedCoupon: CouponDocument | null;
  showHowItWorks: boolean;
  setShowHowItWorks: SetStateType<boolean>;
  hideOnDesktop?: boolean;
}) {
  const summary = getTotalCartAmount(priceSummary);

  return (
    <HorizontalSpacing
      className={`flex flex-col justify-start gap-4 sm:max-w-[700px] mb-3 sm:row-start-3 sm:col-start-2 sm:row-span-3 sm:min-h-fit ${hideOnDesktop ? "sm:hidden" : ""}`}
    >
      {/*****************************************************/}
      <span
        className="text-center tracking-wider text-charcoal-3/40 pt-1.5"
        id="__cartSummary__"
      >
        BILL SUMMARY
      </span>

      <section
        className={`rounded-3xl max-sm:shadow-light sm:border sm:border-charcoal-3/25 bg-ivory-1 px-4 md:px-5 py-4 md:py-5 flex flex-col justify-start gap-2`}
      >
        <div className="flex items-center justify-between">
          <span>Base Total</span>
          <span>
            {INRSymbol}
            {priceSummary.base}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Addon Total</span>
          <span>
            {INRSymbol}
            {priceSummary.addon}
          </span>
        </div>
        {priceSummary.paymentPercentage === 100 && appliedCoupon !== null ? (
          <div className="flex items-center justify-between font-medium text-blue-500">
            <span>Coupon - ({appliedCoupon?.code})</span>
            <span>
              - {INRSymbol}
              {priceSummary.coupon}
            </span>
          </div>
        ) : (
          <></>
        )}
        <div className="flex items-center justify-between">
          <span>Delivery Fee</span>
          <span>
            {INRSymbol}
            {priceSummary.platform}
          </span>
        </div>
        <div className="h-[1px] bg-charcoal-3/30 my-1.5" />
        <div className="flex items-center justify-between font-medium">
          <span>Grand Total</span>
          <span>
            {INRSymbol}
            {summary.grandTotal}
          </span>
        </div>

        {summary.amountDue > 0 ? (
          <>
            <div className="h-[0.5px] bg-charcoal-3/30 my-1.5" />

            <div className="flex items-center justify-between font-medium">
              <span>Amount to Pay</span>
              <span>
                {INRSymbol}
                {summary.payableAmount}
              </span>
            </div>

            <div
              onClick={() => setShowHowItWorks((prev) => !prev)}
              className="cursor-pointer bg-ash/30 border border-ash/70 text-charcoal-3/70 w-fit rounded-md px-2 py-[1px] text-xs flex items-center justify-center gap-1"
            >
              <span>See how its calculated</span>
              <span>
                <ChevronDown
                  strokeWidth={1.5}
                  width={16}
                  fill="#545454"
                  stroke="#fff0"
                  className={`transition-all duration-300 ${showHowItWorks ? "rotate-180" : ""}`}
                />
              </span>
            </div>

            <div
              className={`bg-ash/20 transition-all duration-300 text-xs text-charcoal-3/70 mb-1 rounded-ss-none px-4 py-2.5 space-y-1 rounded-xl ${showHowItWorks ? "" : "hidden"}`}
            >
              <div className="flex items-center justify-between">
                <span>
                  Base Items{" "}
                  <span className="font-semibold">
                    - {priceSummary.paymentPercentage}% applied
                  </span>
                </span>
                <span>
                  {INRSymbol}{" "}
                  {Math.ceil(
                    priceSummary.base * (priceSummary.paymentPercentage / 100)
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>
                  Addons <span className="font-semibold">- Full Payment</span>
                </span>
                <span>
                  {INRSymbol} {priceSummary.addon}
                </span>
              </div>
              <div className="flex items-center justify-between pb-1">
                <span>
                  Convenience Fee{" "}
                  <span className="font-semibold">- Full Payment</span>
                </span>
                <span>
                  {INRSymbol} {priceSummary.platform}
                </span>
              </div>

              <div className="h-[1px] bg-ash/70 w-full" />

              <div className="pt-1 flex items-center justify-between font-medium text-sm">
                <span>Total</span>
                <span>
                  {INRSymbol} {summary.payableAmount}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between font-medium text-red-400">
              <span>Amount Due</span>
              <span>
                {INRSymbol}
                {summary.amountDue}
              </span>
            </div>
          </>
        ) : (
          <></>
        )}
      </section>
    </HorizontalSpacing>
  );
}
