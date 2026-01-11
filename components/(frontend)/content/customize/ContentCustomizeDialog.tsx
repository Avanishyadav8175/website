// utils
import { lazy, memo } from "react";

// components
import { Dialog, DialogContent } from "@/components/ui/dialog";
const LazyContentCustomize = lazy(
  () => import("./components/ContentCustomize")
);
import { Suspense } from "react";

// types
import { type CartItemCustomizationDocument } from "@/common/types/documentation/nestedDocuments/cartItemCustomization";
import { type CartItemDeliveryDocument } from "@/common/types/documentation/nestedDocuments/cartItemDelivery";
import { type CityDocument } from "@/common/types/documentation/presets/city";
import { type ContentCustomizationDocument } from "@/common/types/documentation/nestedDocuments/contentCustomization";
import { type ContentPriceDocument } from "@/common/types/documentation/nestedDocuments/contentPrice";
import { type ImageDocument } from "@/common/types/documentation/media/image";

function ContentCustomizeDialog({
  slug,
  contentName,
  contentImage,
  contentPrice,
  selectedCity,
  showCustomization,
  cartItemCustomization,
  contentCustomization,
  cartItemDelivery,
  onChangeShowCustomization,
  onChangeCartItemCustomization,
  onBookNow
}: {
  slug: string;
  contentName: string;
  contentImage: ImageDocument;
  contentPrice: ContentPriceDocument;
  selectedCity: CityDocument | null;
  showCustomization: boolean;
  cartItemCustomization: CartItemCustomizationDocument;
  contentCustomization: ContentCustomizationDocument;
  cartItemDelivery: CartItemDeliveryDocument;
  onChangeShowCustomization: (showCustomization: boolean) => void;
  onChangeCartItemCustomization: (
    cartItemCustomization: CartItemCustomizationDocument
  ) => void;
  onBookNow: () => void;
}) {
  return (
    <Dialog
      open={showCustomization}
      onOpenChange={onChangeShowCustomization}
    >
      <DialogContent className="p-0 outline-none border-none bg-transparent min-w-fit">
        <section
          className={`relative bg-ivory  sm:bg-ivory-1 pt-3.5 sm:py-0 max-sm:w-device max-sm:h-device sm:rounded-2xl sm:overflow-hidden sm:w-[80dvw] sm:max-w-[1000px] sm:aspect-[7/4] flex flex-col items-stretch max-sm:justify-between sm:justify-start sm:grid sm:grid-cols-[5fr_3fr] gap-3.5 sm:gap-4 max-sm:overflow-y-scroll scrollbar-hide`}
        >
          <Suspense>
            <LazyContentCustomize
              contentName={contentName}
              contentImage={contentImage}
              contentPrice={contentPrice}
              selectedCity={selectedCity}
              cartItemCustomization={cartItemCustomization}
              contentCustomization={contentCustomization}
              cartItemDelivery={cartItemDelivery}
              onChangeCartItemCustomization={onChangeCartItemCustomization}
              onBookNow={onBookNow}
            />
          </Suspense>
        </section>
      </DialogContent>
    </Dialog>
  );
}

export default memo(ContentCustomizeDialog);
