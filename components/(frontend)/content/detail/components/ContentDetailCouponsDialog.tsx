// utils
import { lazy } from "react";

// components
import { Dialog, DialogContent } from "@/components/ui/dialog";
const LazyContentDetailCoupons = lazy(() => import("./ContentDetailCoupons"));
import { Suspense } from "react";

// types
import { type ContentPriceDocument } from "@/common/types/documentation/nestedDocuments/contentPrice";
import { type CouponDocument } from "@/common/types/documentation/contents/coupon";

export default function ContentDetailCouponsDialog({
  showDialog,
  coupons,
  price,
  onChangeShowDialog
}: {
  showDialog: boolean;
  coupons: CouponDocument[];
  price: ContentPriceDocument;
  onChangeShowDialog: (showDialog: boolean) => void;
}) {
  return (
    <Dialog
      open={showDialog}
      onOpenChange={onChangeShowDialog}
    >
      <DialogContent className="p-0 outline-none border-none w-[380px]">
        <div className="*:max-sm:px-3.5 *:sm:px-4 flex flex-col justify-start min-h-[80dvh] max-h-[80dvh] max-sm:max-h-[95dvh] max-sm:bg-[#f2f2f2] rounded-t-3xl sm:rounded-t-2xl">
          <Suspense fallback={<></>}>
            <LazyContentDetailCoupons
              coupons={coupons}
              price={price}
            />
          </Suspense>
        </div>
      </DialogContent>
    </Dialog>
  );
}
