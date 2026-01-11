// icons
import { BadgePercent } from "lucide-react";

// utils
import { lazy } from "react";

// hooks
import { useState } from "react";
import { useAppStates } from "@/hooks/useAppState/useAppState";

// components
import ContentHorizontalSpacing from "../../spacing/ContentHorizontalSpacing";
const LazyContentDetailCouponsDialog = lazy(
  () => import("./ContentDetailCouponsDialog")
);
const LazyContentDetailCouponsDrawer = lazy(
  () => import("./ContentDetailCouponsDrawer")
);
import { Suspense } from "react";

// types
import { type ContentPriceDocument } from "@/common/types/documentation/nestedDocuments/contentPrice";
import { type CouponDocument } from "@/common/types/documentation/contents/coupon";
import ContentDetailCouponTest from "./ContentDetailCouponTest";

export default function ContentDetailCouponSection({
  coupons,
  price
}: {
  coupons: CouponDocument[];
  price: ContentPriceDocument;
}) {
  // hooks
  const { isMobile } = useAppStates();

  // states
  const [showCoupons, setShowCoupons] = useState<boolean>(false);

  return (
    <>
      <ContentHorizontalSpacing className="sm:pt-6 pt-2.5 pb-3.5">
        <div className="rounded-xl overflow-hidden sm:max-w-[calc(470px_+_24px)]">
          <button
            className="w-full bg-green-100/80 py-2 sm:py-3.5 px-4 flex items-center justify-between cursor-pointer transition-all duration-300 hover:bg-green-100"
            onClick={() => {
              if (isMobile) {
                const event = new CustomEvent("couponOpen", {
                  detail: {
                    setIsOpen: true,
                    data: { coupons: coupons, price: price }
                  }
                });
                window.dispatchEvent(event);
              } else {
                setShowCoupons(true);
              }
            }}
          >
            <div className="flex items-center justify-start gap-x-1.5 text-green-700">
              <BadgePercent
                width={18}
                height={18}
              />
              <span>Offers and Coupons</span>
            </div>
            <div className="font-semibold uppercase text-xs sm:text-sm tracking-wide text-green-700">
              View all
            </div>
          </button>
        </div>
      </ContentHorizontalSpacing>
      {isMobile ? (
        <Suspense fallback={<></>}>
          {/* <ContentDetailCouponTest
            show={showCoupons}
            showController={setShowCoupons}
          /> */}
          {/* <LazyContentDetailCouponsDrawer
            showDrawer={showCoupons}
            coupons={coupons}
            price={price}
            onChangeShowDrawer={setShowCoupons}
          /> */}
        </Suspense>
      ) : (
        <Suspense fallback={<></>}>
          <LazyContentDetailCouponsDialog
            showDialog={showCoupons}
            coupons={coupons}
            price={price}
            onChangeShowDialog={setShowCoupons}
          />
        </Suspense>
      )}
    </>
  );
}
