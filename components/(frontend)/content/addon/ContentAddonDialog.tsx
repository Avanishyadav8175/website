// utils
import { lazy, memo } from "react";

// components
import { Dialog, DialogContent } from "@/components/ui/dialog";
const LazyContentAddon = lazy(() => import("./components/ContentAddonClient"));
import { Suspense } from "react";

// types
import { type CartItemAddonDocument } from "@/common/types/documentation/nestedDocuments/cartItemAddon";
import { type ContentAddonDocument } from "@/common/types/documentation/nestedDocuments/contentAddon";

function ContentAddonDialog({
  showAddon,
  cartItemPrice,
  cartItemAddons,
  contentAddons,
  onChangeShowAddon,
  onChangeCartItemAddon,
  onBookNow
}: {
  showAddon: boolean;
  cartItemPrice: number;
  contentAddons: ContentAddonDocument[];
  cartItemAddons: CartItemAddonDocument[];
  onChangeShowAddon: (showAddon: boolean) => void;
  onChangeCartItemAddon: (cartItemAddons: CartItemAddonDocument[]) => void;
  onBookNow: () => void;
}) {
  return (
    <Dialog
      open={showAddon}
      onOpenChange={onChangeShowAddon}
    >
      <DialogContent className="p-0 outline-none border-none bg-transparent min-w-fit z-[10000]">
        <section
          className={`relative bg-ivory sm:bg-ivory-1 max-sm:w-[100dvw] max-sm:h-[100dvh] sm:rounded-2xl overflow-hidden sm:w-[80dvw] sm:max-w-[1000px] sm:aspect-[20/11] grid grid-cols-1 grid-rows-[auto_1fr]`}
        >
          <Suspense fallback={<></>}>
            <LazyContentAddon
              cartItemPrice={cartItemPrice}
              cartItemAddons={cartItemAddons}
              contentAddons={contentAddons}
              onChangeCartItemAddon={onChangeCartItemAddon}
              onBookNow={onBookNow}
            />
          </Suspense>
        </section>
      </DialogContent>
    </Dialog>
  );
}

export default memo(ContentAddonDialog);
