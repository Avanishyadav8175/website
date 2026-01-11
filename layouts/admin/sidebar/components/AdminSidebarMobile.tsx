// components
import { AdminSidebarContent } from "./AdminSidebarContent";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";

// icons
import { List } from "lucide-react";

export default function AdminSidebarMobile() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="absolute bottom-16 z-50 cursor-pointer left-[16px] w-fit h-fit aspect-square rounded-xl p-3 shadow-sm bg-teal-200 border border-teal-300/10 text-charcoal-3">
          <List
            strokeWidth={1.5}
            width={26}
            height={26}
          />
        </div>
      </DrawerTrigger>
      <DrawerContent className="z-[996] pl-3 pr-3.5 pb-2 rounded-t-3xl outline-none max-h-[95dvh]">
        <DrawerTitle></DrawerTitle>
        <AdminSidebarContent isMobile />
      </DrawerContent>
    </Drawer>
  );
}
