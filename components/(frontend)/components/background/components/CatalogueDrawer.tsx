// icons
import { Grip, Shapes, X } from "lucide-react";

// utils
import { memo, useState } from "react";

// components
import CatalogueDrawerContent from "./CatalogueDrawerContent";
import { Sheet, SheetContent } from "@/components/ui/sheet";

function CatalogueDrawer() {
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  return (
    <>
      <div onClick={() => setShowDrawer(true)} className="flex flex-col items-center justify-center gap-0.5">
        <Shapes width={18} strokeWidth={1.5} height={18} />
        <span>Categories</span>
      </div>

      <Sheet open={showDrawer} onOpenChange={setShowDrawer}>
        <SheetContent className="h-device w-device z-[900] !px-4">
          <div
            className={`h-device text-charcoal-2 bg-ivory-1 w-full transition-all duration-300 overflow-auto grid grid-cols-1 auto-rows-min`}
          >
            <CatalogueDrawerContent
              onClose={() => {
                setShowDrawer(false);
              }}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default memo(CatalogueDrawer);
