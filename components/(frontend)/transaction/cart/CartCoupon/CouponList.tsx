
"use client";
import { INRSymbol } from "@/common/constants/symbols";
import { CouponDocument } from "@/common/types/documentation/contents/coupon";
import { SetStateType } from "@/common/types/reactTypes";
import { DrawerClose } from "@/components/ui/drawer";
import AtomicCoupon from "./AtomicCoupon";
import { TransactionPriceSummaryType } from "@/components/pages/(frontend)/Transaction/Cart/CartWithHook";
import { usePathname } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { TicketX } from "lucide-react";
import { DialogClose } from "@/components/ui/dialog";

export default function FrontendCouponsList({
  availableCoupons,
  appliedCoupon,
  priceSummary,
  keyword,
  notInCart,
  setKeyword,
  onSelectCoupon,
  closeDialog
}: {
  availableCoupons: CouponDocument[];
  appliedCoupon: CouponDocument | null;
  priceSummary: TransactionPriceSummaryType;
  keyword: string;
  notInCart?: boolean;
  setKeyword: SetStateType<string>;
  onSelectCoupon: (selectedCoupon: CouponDocument | null) => void;
  closeDialog: () => void;
}) {
  const {
    data: {
      price: { base, addon }
    }
  } = useCart();

  const currPath = usePathname();
  const inCartPage = currPath.includes("/cart");

  return (
    <div className="*:max-sm:px-3.5 *:sm:px-4 flex flex-col justify-start min-h-[80dvh] max-h-[80dvh] max-sm:max-h-[95dvh] max-sm:bg-[#f2f2f2] rounded-t-3xl sm:rounded-t-2xl">
      {/* TOP SECTION ----------------------------------------------------------------------- */}
      {inCartPage ? (
        <div className="bg-ivory-1 max-sm:pt-6 max-sm:pb-2.5 pt-4 pb-3 rounded-t-3xl sm:rounded-t-2xl flex flex-col justify-start">
          <span className="font-medium sm:text-lg text-charcoal-3/90">
            Apply Coupon
          </span>
          {!notInCart ? (
            <span className="text-charcoal-3/50 text-sm">
              Yout Cart: {INRSymbol}{" "}
              {priceSummary.addon + priceSummary.base + priceSummary.platform}
            </span>
          ) : (
            <></>
          )}

          <div className="bg-charcoal-3/5 border border-charcoal-3/5 px-3.5 py-2.5 mt-2 mb-0.5 rounded-2xl grid grid-cols-[1fr_auto]">
            <input
              type="text"
              placeholder="Enter Coupon Code"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="bg-transparent outline-none border-none placeholder:text-charcoal-3/30 text-sm"
            />
            {!notInCart ? (
              <>
                <DrawerClose className="sm:hidden text-sm text-sienna font-medium flex items-center justify-center cursor-pointer transition-all duration-300 hover:brightness-75 pl-3">
                  APPLY
                </DrawerClose>

                <DialogClose asChild>
                  <div
                    onClick={() => {
                      const selectedCoupon = availableCoupons
                        .slice()
                        .filter((x) => x !== undefined)
                        .find((coupon) => coupon.code === keyword);

                      if (
                        selectedCoupon &&
                        selectedCoupon.type === "discount" &&
                        selectedCoupon.minimumOrderAmount > 0 &&
                        selectedCoupon.minimumOrderAmount > base + addon
                      )
                        onSelectCoupon(selectedCoupon);
                    }}
                    className="max-sm:hidden text-sm text-sienna font-medium flex items-center justify-center cursor-pointer transition-all duration-300 hover:brightness-75 pl-3"
                  >
                    APPLY
                  </div>
                </DialogClose>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}

      {/* LIST SECTION ----------------------------------------------------------------------- */}
      <div
        className={`bg-ivory-2 h-full pb-4 sm:rounded-b-2xl flex flex-col justify-start gap-3.5 overflow-y-scroll scrollbar-hide ${inCartPage ? "max-sm:py-3.5 pt-3" : "rounded-t-3xl pt-6"}`}
      >
        {/* <span className={`text-charcoal-3/80 py-1.5 pl-1 font-medium`}>
          Best Offers
        </span>
        {availableCoupons.slice(0, 2).map((coupon, index) => (
          <AtomicCoupon
            coupon={coupon}
            appliedCoupon={appliedCoupon}
            closeDialog={closeDialog}
            onSelectCoupon={onSelectCoupon}
            shine
            inCart={!notInCart}
            key={index}
          />
        ))}
        <span className="text-charcoal-3/80 py-1.5 pl-1 font-medium">
          All Coupons
        </span> */}
        {availableCoupons.length > 0 ? (
          availableCoupons
            .slice()
            .sort((a: CouponDocument, b: CouponDocument) => {
              const firstApplicable =
                a.type === "discount" &&
                a.minimumOrderAmount > 0 &&
                a.minimumOrderAmount > base + addon;

              const secondApplicable =
                b.type === "discount" &&
                b.minimumOrderAmount > 0 &&
                b.minimumOrderAmount > base + addon;

              return (!firstApplicable ? -1 : 0) - (!secondApplicable ? -1 : 0);
            })
            .map((coupon, index) => (
              <AtomicCoupon
                coupon={coupon}
                appliedCoupon={appliedCoupon}
                closeDialog={closeDialog}
                onSelectCoupon={onSelectCoupon}
                key={index}
                inCart={!notInCart}
                notApplicable={
                  coupon.type === "discount" &&
                  coupon.minimumOrderAmount > 0 &&
                  coupon.minimumOrderAmount > base + addon
                    ? true
                    : false
                }
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
