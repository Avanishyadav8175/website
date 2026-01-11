// components
import CartCoupons from "./CartCoupons";
import { Drawer, DrawerContent } from "@/components/ui/drawer";

// types
import { type CouponDocument } from "@/common/types/documentation/contents/coupon";

export default function CartCouponsDrawer({
  showDrawer,
  coupons,
  onChangeShowDrawer,
  onApply
}: {
  showDrawer: boolean;
  coupons: CouponDocument[];
  onChangeShowDrawer: (showDrawer: boolean) => void;
  onApply: (coupon: CouponDocument) => void;
}) {
  return (
    <Drawer
      open={showDrawer}
      onOpenChange={onChangeShowDrawer}
    >
      <DrawerContent className="z-[996] bg-transparent outline-none border-none max-h-[95dvh] h-fit rounded-none">
        <CartCoupons
          coupons={coupons}
          onApply={onApply}
        />
      </DrawerContent>
    </Drawer>
  );
}
