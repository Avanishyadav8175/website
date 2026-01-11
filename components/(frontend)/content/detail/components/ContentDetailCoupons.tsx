// icons
import { TicketX } from "lucide-react";

// utils
import { memo } from "react";
import { getContentPrice } from "../../utils/getContentPrice";

// hooks
import { useAppStates } from "@/hooks/useAppState/useAppState";

// components
import ContentDetailCoupon from "./ContentDetailCoupon";

// types
import { type ContentPriceDocument } from "@/common/types/documentation/nestedDocuments/contentPrice";
import { type CouponDocument } from "@/common/types/documentation/contents/coupon";

function ContentDetailCoupons({
  price: contentPrice,
  coupons
}: {
  price: ContentPriceDocument;
  coupons: CouponDocument[];
}) {
  // hooks
  const {
    location: {
      data: { selectedCity }
    }
  } = useAppStates();

  // variables
  const { price } = getContentPrice({
    city: selectedCity,
    price: contentPrice
  });

  return (
    <>
      <div
        className={`bg-ivory-2 h-full pb-4 sm:rounded-b-2xl flex flex-col justify-start gap-3.5 overflow-y-scroll scrollbar-hide rounded-t-3xl pt-6`}
      >
        {coupons.length ? (
          coupons
            .sort((a, b) => {
              const firstApplicable =
                a.type === "discount" && a.minimumOrderAmount > price;

              const secondApplicable =
                b.type === "discount" && b.minimumOrderAmount > price;

              return (!firstApplicable ? -1 : 0) - (!secondApplicable ? -1 : 0);
            })
            .map((coupon) => (
              <ContentDetailCoupon
                key={coupon._id as string}
                price={contentPrice}
                coupon={coupon}
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
    </>
  );
}

export default memo(ContentDetailCoupons);
