// components
import CartCheckoutDetail from "./CartCheckoutDetail";
import { Drawer, DrawerContent } from "@/components/ui/drawer";

export default function CartCheckoutDrawer({
  showDrawer,
  onChangeShowDrawer
}: {
  showDrawer: boolean;
  onChangeShowDrawer: (showDialog: boolean) => void;
}) {
  return (
    <Drawer
      direction="top"
      open={showDrawer}
      onOpenChange={onChangeShowDrawer}
    >
      <DrawerContent className=" z-[996] outline-none border-none p-0 m-0 h-[60dvh] top-0 min-h-fit rounded-3xl rounded-t-3xl">
        <CartCheckoutDetail
          onClose={() => {
            onChangeShowDrawer(false);
          }}
        />
      </DrawerContent>
    </Drawer>
  );
}
