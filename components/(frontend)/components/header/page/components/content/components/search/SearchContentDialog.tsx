// utils
import { lazy, memo } from "react";

// components
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
    <Dialog
      open={isFocused}
      onOpenChange={onChangeIsFocused}
    >
      <DialogContent className="flex flex-col items-start justify-start outline-none border-none z-[996] max-w-[400px] h-[560px] bg-ivory-1 rounded-t-3xl px-3.5 pt-6 sm:pt-4 pb-5 gap-y-2 transition-all duration-300 max-sm:hidden">
        <Suspense fallback={<></>}>
          <LazySearchContentUI
            isFocused={isFocused}
            searchResults={searchResults}
            onChangeIsFocused={onChangeIsFocused}
          />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}

export default memo(SearchContentDrawer);
