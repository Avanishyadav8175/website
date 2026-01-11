
import { HorizontalSpacing } from "@/components/(frontend)/global/_Spacings/HorizontalSpacings";
import { BadgePercent, ChevronRight, CircleCheck } from "lucide-react";
import { useState } from "react";
import CouponSelectionTrigger from "./CouponSelectionTrigger";
import FrontendCouponsList from "./CouponList";
import { CouponDocument } from "@/common/types/documentation/contents/coupon";
import { TransactionPriceSummaryType } from "@/components/pages/(frontend)/Transaction/Cart/CartWithHook";
import { INRSymbol } from "@/common/constants/symbols";
import { useCart } from "@/hooks/useCart";

export default function FrontendCartCoupons({
  paymentPercentage,
  priceSummary,
  hideOnDesktop,
  appliedCoupon,
  availableCoupons
}: {
  paymentPercentage: number;
  priceSummary: TransactionPriceSummaryType;
  hideOnDesktop?: boolean;
  appliedCoupon: CouponDocument | null;
  availableCoupons: CouponDocument[];
}) {
  const {
    cartFunctions: {
      updateCartContext: { updateSelectedCoupon }
    },
    data: {
      price: { paymentPercentage: selectedPercentage }
    }
  } = useCart();

  const [open, setOpen] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");

  return (
    <>
      <HorizontalSpacing
        className={`max-md:pt-3 mb-3 sm:mt-4 sm:mb-7 h-fit ${hideOnDesktop ? "sm:hidden" : ""}`}
      >
        {selectedPercentage !== 100 ? (
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
        ) : appliedCoupon ? (
          <div
            className={`rounded-xl ${priceSummary.coupon === 0 ? "bg-ash-3/15 border-charcoal-3/20 text-charcoal-3/75 opacity-80" : "bg-blue-100/70 border-blue-300/80 text-blue-500"}  border  font-medium *:px-3 pt-2.5 text-sm flex flex-col justify-start transition-all duration-300`}
          >
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-start justify-start gap-2">
                <span>
                  <CircleCheck
                    strokeWidth="2"
                    fill="#3b82f6"
                    stroke="#fff"
                    width={16}
                    className={`scale-110 -translate-y-[2px] ${priceSummary.coupon === 0 ? "grayscale" : ""}`}
                  />
                </span>
                <span className="flex flex-col justify-start">
                  {priceSummary.coupon > 0 ? (
                    <>
                      <span>
                        You saved {INRSymbol} {priceSummary.coupon} with this
                        code
                      </span>
                      <span className="text-xs text-charcoal-3/50 py-0.5">
                        Coupon Applied
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        You have {selectedPercentage}% option selected
                      </span>
                      <span className="text-xs text-charcoal-3/50 py-0.5">
                        Coupon not applicable for this option
                      </span>
                    </>
                  )}
                </span>
              </div>
              <div
                // onClick={() => setAppliedCoupon((prev) => null)}
                onClick={() => updateSelectedCoupon(null)}
                className="text-red-700/80 transition-all duration-300 hover:brightness-90 hover:underline hover:underline-offset-2 cursor-pointer"
              >
                Remove
              </div>
            </div>

            <CouponSelectionTrigger
              open={open}
              setOpenPopup={setOpen}
              couponListComponent={
                <FrontendCouponsList
                  appliedCoupon={appliedCoupon}
                  availableCoupons={
                    keyword
                      ? availableCoupons.filter(({ code }) =>
                          code.toLowerCase().includes(keyword.toLowerCase())
                        )
                      : availableCoupons
                  }
                  onSelectCoupon={(selectedCoupon: CouponDocument | null) =>
                    updateSelectedCoupon(selectedCoupon)
                  }
                  priceSummary={priceSummary}
                  closeDialog={() => setOpen((prev) => false)}
                  keyword={keyword}
                  setKeyword={setKeyword}
                />
              }
            >
              <div
                className={`flex font-normal items-center cursor-pointer justify-center pb-2.5 gap-1.5 border-t ${priceSummary.coupon === 0 ? "border-charcoal-3/15" : "border-blue-300/50"} pt-2.5 transition-all duration-300 hover:gap-2.5`}
              >
                <span>Select another coupon</span>
                <ChevronRight
                  strokeWidth={2}
                  width={15}
                  className="translate-y-[1px]"
                />
              </div>
            </CouponSelectionTrigger>
          </div>
        ) : (
          <CouponSelectionTrigger
            open={open}
            setOpenPopup={setOpen}
            couponListComponent={
              <FrontendCouponsList
                appliedCoupon={appliedCoupon}
                availableCoupons={
                  keyword
                    ? availableCoupons.filter(({ code }) =>
                        code.toLowerCase().includes(keyword.toLowerCase())
                      )
                    : availableCoupons
                }
                onSelectCoupon={(selectedCoupon: CouponDocument | null) =>
                  updateSelectedCoupon(selectedCoupon)
                }
                priceSummary={priceSummary}
                closeDialog={() => setOpen((prev) => false)}
                keyword={keyword}
                setKeyword={setKeyword}
              />
            }
          >
            <div className="cursor-pointer rounded-xl bg-blue-200/40 border border-blue-300 hover:bg-blue-200/60 font-medium px-3 py-2.5 text-sm flex items-center justify-between gap-2.5 text-blue-500 transition-all duration-300">
              <div className="flex items-center justify-start gap-2.5">
                <BadgePercent
                  strokeWidth={1.5}
                  fill="#3b82f6"
                  stroke="#dbeafe"
                />
                <span>Select coupon</span>
              </div>
              <div className="text-[13px] text-charcoal-3/50">
                View Offers
              </div>
            </div>
          </CouponSelectionTrigger>
        )}
      </HorizontalSpacing>
    </>
  );
}
