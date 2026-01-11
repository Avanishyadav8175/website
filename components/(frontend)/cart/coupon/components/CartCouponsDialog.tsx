// components
import CartCoupons from "./CartCoupons";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// types
import { type CouponDocument } from "@/common/types/documentation/contents/coupon";

export default function CartCouponsDialog({
  showDialog,
  coupons,
  onChangeShowDialog,
  onApply
}: {
  showDialog: boolean;
  coupons: CouponDocument[];
  onChangeShowDialog: (showDialog: boolean) => void;
  onApply: (coupon: CouponDocument) => void;
}) {
  return (
    <Dialog
      open={showDialog}
      onOpenChange={onChangeShowDialog}
    >
      <DialogContent className="z-[996] max-sm:hidden p-0 w-[397px] bg-transparent max-w-[397px] outline-none border-none rounded-none">
        <CartCoupons
          coupons={coupons}
          onApply={onApply}
        />
      </DialogContent>
    </Dialog>
  );
}
