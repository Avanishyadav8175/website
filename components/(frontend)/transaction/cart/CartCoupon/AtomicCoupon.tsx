import { INRSymbol } from "@/common/constants/symbols";
import { CouponDocument } from "@/common/types/documentation/contents/coupon";
import { CouponDiscountDocument } from "@/common/types/documentation/nestedDocuments/couponDiscount";
import { DrawerClose } from "@/components/ui/drawer";
import { useCart } from "@/hooks/useCart";
import { CheckCheck } from "lucide-react";
import { useState } from "react";

export default function AtomicCoupon({
  appliedCoupon,
  coupon,
  shine,
  inCart,
  onSelectCoupon,
  closeDialog,
  notApplicable
}: {
  coupon: CouponDocument;
  appliedCoupon: CouponDocument | null;
  shine?: boolean;
  inCart?: boolean;
  onSelectCoupon: (selectedCoupon: CouponDocument | null) => void;
  closeDialog: () => void;
  notApplicable?: boolean;
}) {
  const {
    data: {
      price: { base, platform, addon }
    }
  } = useCart();

  const couponDiscount = coupon.discount as CouponDiscountDocument;

  const [openDetails, setOpenDetails] = useState<boolean>(false);

  const header =
    coupon.type === "free-delivery"
      ? "FREE DELIVERY"
      : couponDiscount.type === "fixed"
        ? "FLAT OFF"
        : `${couponDiscount.percentage}% OFF`;

  return (
    <div
      className={`rounded-3xl bg-ivory-1 relative  grid grid-cols-[50px_auto] grid-rows-[repeat(4,auto)] transition-all duration-300`}
    >
      {/* LEFT GOLD PLATING */}
      <div
        className={`relative grid *:row-start-1 *:col-start-1 ${notApplicable ? "bg-charcoal-3/30" : "bg-sienna-2"} overflow-hidden text-white row-span-4 place-items-center rounded-l-3xl`}
      >
        <div className="whitespace-nowrap relative font-extrabold h-full aspect-square -rotate-90 flex items-center justify-center -left-1/2 translate-x-[calc(calc(50px_/_2)_+_2px)] tracking-wider">
          {header}
        </div>

        <div className="flex flex-col justify-center items-center gap-2 *:rounded-full *:aspect-square *:bg-ivory-2 *:w-3.5 justify-self-start -translate-x-[7px] z-[999]">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>

        {shine ? (
          <div className="sm:hidden absolute h-full w-7 -left-[35%] bg-sienna-3/65 blur-md opacity-60 rotate-12 z-30 top-0 animate-shine-infinite-slow" />
        ) : (
          <></>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div
        className={`pl-3 pr-4 pt-2.5 flex items-stretch ${appliedCoupon && appliedCoupon._id === coupon._id ? "" : ""}`}
      >
        <div className="pb-4 grid grid-cols-[1fr_auto] grid-rows-[repeat(2,auto)] w-full items-center border-b-[1.5px] border-dashed border-charcoal-3/15 text-charcoal-3/80">
          <span className="pt-1.5 pb-1 font-semibold tracking-wide text-lg">
            {coupon.code}
          </span>

          <DrawerClose
            onClick={() => onSelectCoupon(coupon)}
            className={`sm:hidden font-medium ${appliedCoupon && appliedCoupon._id === coupon._id ? "text-green-600" : "text-sienna"}  cursor-pointer transition-all duration-300 hover:brightness-75 flex items-center justify-end gap-1`}
          >
            {inCart ? (
              appliedCoupon && appliedCoupon._id === coupon._id ? (
                <>
                  <CheckCheck
                    strokeWidth={1.5}
                    width={18}
                  />
                  <span>Applied</span>
                </>
              ) : (
                <>Apply</>
              )
            ) : (
              <></>
            )}
          </DrawerClose>
          <span
            onClick={
              notApplicable
                ? () => {}
                : () => {
                    onSelectCoupon(coupon);
                    closeDialog();
                  }
            }
            className="max-sm:hidden font-medium text-sienna cursor-pointer transition-all duration-300 hover:brightness-75 flex items-center justify-end gap-1"
          >
            {!notApplicable && inCart ? (
              appliedCoupon && appliedCoupon._id === coupon._id ? (
                <>
                  <CheckCheck
                    strokeWidth={1.5}
                    width={18}
                  />
                  <span>Applied</span>
                </>
              ) : (
                <>Apply</>
              )
            ) : (
              <></>
            )}
          </span>

          <span
            className={`col-span-2 ${notApplicable ? "text-red-500 " : "text-green-600 "} font-medium leading-none text-sm`}
          >
            {notApplicable
              ? `Add items worth ${INRSymbol} ${coupon.minimumOrderAmount - (base + addon)} more to unlock`
              : `Save ${INRSymbol} ${
                  coupon.type === "discount" && coupon.discount
                    ? coupon.discount.type === "fixed"
                      ? Math.min(
                          coupon.minimumOrderAmount &&
                            coupon.minimumOrderAmount > 0
                            ? coupon.minimumOrderAmount
                            : Infinity,
                          coupon.discount.limit
                        )
                      : coupon.discount.limit && coupon.discount.limit > 0
                        ? Math.min(
                            coupon.discount.limit,
                            Math.ceil(
                              (base *
                                Math.max(
                                  0,
                                  Math.min(100, coupon.discount.percentage || 0)
                                )) /
                                100
                            )
                          )
                        : Math.ceil(
                            (base *
                              Math.max(
                                0,
                                Math.min(100, coupon.discount.percentage || 0)
                              )) /
                              100
                          )
                    : platform
                } on this offer!
            `}
          </span>
        </div>
      </div>
      <div className="px-2.5 py-2 pr-10 flex items-center text-sm text-charcoal-3/50">
        Use code {coupon.code} and get{" "}
        {coupon.type === "discount" && coupon.discount
          ? coupon.discount.type === "fixed"
            ? `Flat ${INRSymbol} ${coupon.discount.limit} off on this order${coupon.minimumOrderAmount && coupon.minimumOrderAmount > 0 ? ` above ${INRSymbol}${coupon.minimumOrderAmount}` : "."}`
            : `${coupon.discount.percentage || "0"}% off on this order${coupon.discount.limit && coupon.discount.limit > 0 ? ` upto ${INRSymbol}${coupon.discount.limit}` : ""}${coupon.minimumOrderAmount && coupon.minimumOrderAmount > 0 ? ` above ${INRSymbol}${coupon.minimumOrderAmount}` : "."}`
          : "Free Delivery on this order."}
      </div>
      <div
        onClick={() => setOpenDetails((prev) => !prev)}
        className={`px-2.5 ${openDetails ? "pb-2.5" : "pb-4"} cursor-pointer w-fit pt-1.5 font-medium text-charcoal-2/70 flex items-center justify-start gap-1.5`}
      >
        {openDetails ? (
          <>
            <span>-</span>
            <span>LESS</span>
          </>
        ) : (
          <>
            <span>+</span>
            <span>MORE</span>
          </>
        )}
      </div>
      {openDetails ? (
        <div className={`text-sm px-3.5 pl-6 pb-4 text-charcoal-3/50`}>
          {coupon.description}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
