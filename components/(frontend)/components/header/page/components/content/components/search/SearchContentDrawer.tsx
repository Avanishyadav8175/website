// utils
import { lazy, memo } from "react";

// components
import { Drawer, DrawerContent } from "@/components/ui/drawer";
const LazySearchContentUI = lazy(() => import("./SearchContentUI"));
import { Suspense } from "react";

// types
import { type SearchBarInitialContentsType } from "../../../../Header";

function SearchContentDrawer({
  isFocused,
  searchResults,
  onChangeIsFocused
}: {
  isFocused: boolean;
  searchResults: SearchBarInitialContentsType | null;
  onChangeIsFocused: (isFocused: boolean) => void;
}) {
  return (
    <Drawer
      open={isFocused}
      onOpenChange={onChangeIsFocused}
    >
      <DrawerContent className="outline-none border-none z-[996] h-[95dvh] bg-ivory-1 rounded-t-3xl px-3.5 pt-6 pb-5 gap-y-4 transition-all duration-300 lg:hidden">
        <Suspense fallback={<></>}>
          <LazySearchContentUI
            isFocused={isFocused}
            searchResults={searchResults}
            onChangeIsFocused={onChangeIsFocused}
          />
        </Suspense>
      </DrawerContent>
    </Drawer>
  );
}

export default memo(SearchContentDrawer);
