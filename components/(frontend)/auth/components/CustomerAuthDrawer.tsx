// utils
import { memo } from "react";

// components
import CustomerAuthUI from "./CustomerAuthUI";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer";

function CustomerAuthDrawer({
  showDrawer,
  onChangeShowDrawer
}: {
  showDrawer: boolean;
  onChangeShowDrawer: (showDrawer: boolean) => void;
}) {
  return (
    <Drawer
      open={showDrawer}
      onOpenChange={onChangeShowDrawer}
    >
      <DrawerContent className="sm:hidden p-0 pb-10 overflow-hidden h-[96dvh] bg-ivory-1 border-none outline-none rounded-t-3xl z-[995] flex flex-col justify-start">
        <DrawerHeader className="hidden">
          <DrawerTitle className="hidden"></DrawerTitle>
        </DrawerHeader>
        <CustomerAuthUI />
      </DrawerContent>
    </Drawer>
  );
}

export default memo(CustomerAuthDrawer);
