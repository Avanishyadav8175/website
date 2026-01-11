// utils
import { lazy, memo, Suspense } from "react";

// providers
import { LocationProvider } from "@/hooks/useLocation/useLocation";

// components
import { Drawer, DrawerContent } from "@/components/ui/drawer";
const LazyCityPopup = lazy(() => import("./CityPopup"));

function CityDrawer({
  showDrawer,
  onToggleShowDrawer
}: {
  showDrawer: boolean;
  onToggleShowDrawer: (showDrawer: boolean) => void;
}) {
  return (
    <Drawer
      open={showDrawer}
      onOpenChange={onToggleShowDrawer}
    >
      <DrawerContent className="border-none outline-none p-0 rounded-t-3xl h-[96dvh] overflow-hidden bg-ivory-1 z-[996]">
        <LocationProvider>
          <Suspense fallback={<></>}>
            <LazyCityPopup
              closeDialog={() => {
                onToggleShowDrawer(false);
              }}
            />
          </Suspense>
        </LocationProvider>
      </DrawerContent>
    </Drawer>
  );
}

export default memo(CityDrawer);
