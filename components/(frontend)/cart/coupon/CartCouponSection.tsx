// constants
import { IS_MOBILE } from "@/common/constants/mediaQueries";

// hooks
import { useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useCart } from "@/hooks/useOptimizedCart/useCart";

// components
import CartCouponPreviewApplied from "./components/CartCouponPreviewApplied";
import CartCouponPreviewNotApplicable from "./components/CartCouponPreviewNotApplicable";
import CartCouponPreviewNotApplied from "./components/CartCouponPreviewNotApplied";
import CartCouponsDialog from "./components/CartCouponsDialog";
import CartCouponsDrawer from "./components/CartCouponsDrawer";

// types
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type CouponDocument } from "@/common/types/documentation/contents/coupon";

export default function CartCouponSection() {
  // hooks
  const isMobile = useMediaQuery(IS_MOBILE);
  const {
    items,
    price: { paymentPercentage },
    coupon: appliedCoupon,
    onChangeCoupon
  } = useCart();

  // states
  const [showCoupons, setShowCoupons] = useState<boolean>(false);

  // variables
  const isApplicable = paymentPercentage === 100;

  // memoized
  const coupons = useMemo(
    () =>
      (
        items.flatMap(
          ({ content }) =>
            (content as ContentDocument)._coupons as CouponDocument[]
        ) || []
      ).filter(
        (coupon, index, self) =>
          self.findIndex((c) => c._id === coupon._id) === index
      ),
    [items]
  );

  // event handlers
  const handleApplyCoupon = (coupon: CouponDocument) => {
    onChangeCoupon(coupon);
    setShowCoupons(false);
  };

  return (
    <>
      <div
        className={
          "px-3 min-[1350px]:px-0 lg:!pl-7 lg:border-l border-charcoal-3/20 max-md:pt-3 pb-3 lg:!py-4 h-fit"
        }
      >
        {!isApplicable && <CartCouponPreviewNotApplicable />}
        {isApplicable &&
          (appliedCoupon ? (
            <CartCouponPreviewApplied
              onChangeShowCoupons={setShowCoupons}
              onRemoveCoupon={() => {
                onChangeCoupon(null);
              }}
            />
          ) : (
            <CartCouponPreviewNotApplied onChangeShowCoupons={setShowCoupons} />
          ))}
      </div>
      {isMobile ? (
        <CartCouponsDrawer
          showDrawer={showCoupons}
          coupons={coupons}
          onChangeShowDrawer={setShowCoupons}
          onApply={handleApplyCoupon}
        />
      ) : (
        <CartCouponsDialog
          showDialog={showCoupons}
          coupons={coupons}
          onChangeShowDialog={setShowCoupons}
          onApply={handleApplyCoupon}
        />
      )}
    </>
  );
}
