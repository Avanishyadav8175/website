// utils
import { lazy } from "react";

// components
import { Drawer, DrawerContent } from "@/components/ui/drawer";
const LazyContentDetailCoupons = lazy(() => import("./ContentDetailCoupons"));
import { Suspense } from "react";

// types
import { type ContentPriceDocument } from "@/common/types/documentation/nestedDocuments/contentPrice";
import { type CouponDocument } from "@/common/types/documentation/contents/coupon";

export default function ContentDetailCouponsDrawer({
  showDrawer,
  coupons,
  price,
  onChangeShowDrawer
}: {
  showDrawer: boolean;
  coupons: CouponDocument[];
  price: ContentPriceDocument;
  onChangeShowDrawer: (showDrawer: boolean) => void;
}) {
  return (
    <Drawer
      open={showDrawer}
      onOpenChange={onChangeShowDrawer}
    >
      <DrawerContent className="z-[996] outline-none border-none bg-ivory-1 rounded-t-3xl">
        <div className="*:max-sm:px-3.5 *:sm:px-4 flex flex-col justify-start min-h-[80dvh] max-h-[80dvh] max-sm:max-h-[95dvh] max-sm:bg-[#f2f2f2] rounded-t-3xl sm:rounded-t-2xl">
          <Suspense fallback={<></>}>
            <LazyContentDetailCoupons
              coupons={coupons}
              price={price}
            />
          </Suspense>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
