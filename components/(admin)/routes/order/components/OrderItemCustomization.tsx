// icons
import { ChevronDown, SparklesIcon } from "lucide-react";

// constants
import { INRSymbol } from "@/common/constants/symbols";

// hooks
import { useSelector } from "@/store/withType";

// redux
import { selectCustomizationImage } from "@/store/features/media/customizationImageSlice";
import { selectEnhancement } from "@/store/features/presets/enhancementSlice";
import { selectFlavour } from "@/store/features/presets/flavourSlice";
import { selectUpgrade } from "@/store/features/presets/upgradeSlice";

// components
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

// types
import { type CartItemCustomizationDocument } from "@/common/types/documentation/nestedDocuments/cartItemCustomization";

export default function OrderItemCustomization({
  customization: {
    enhancement,
    upgrade,
    flavour,
    balloonColor,
    uploadedText,
    uploadedImage
  }
}: {
  customization: CartItemCustomizationDocument;
}) {
  // redux states
  const { documents: enhancements } = useSelector(
    selectEnhancement.documentList
  );
  const { documents: upgrades } = useSelector(selectUpgrade.documentList);
  const { documents: flavours } = useSelector(selectFlavour.documentList);
  const { documents: customizationImages } = useSelector(
    selectCustomizationImage.documentList
  );

  const upGrade = upgrade
    ? upgrades.find(({ _id }) => _id === upgrade.upgrade)
    : undefined;

  const flavor = flavour
    ? flavours.find(({ _id }) => _id === flavour.flavour)
    : undefined;

  const totalCustomizations =
    (balloonColor ? 1 : 0) +
    (uploadedImage ? 1 : 0) +
    (uploadedText ? 1 : 0) +
    (flavor ? 1 : 0) +
    (upGrade ? 1 : 0) +
    (enhancement ? enhancement.items.length : 0);

  const enhancementList = enhancement
    ? enhancement.items.map(({ enhancement: enhancementId, price }, i) => {
        const enhancement = enhancements.find(
          ({ _id }) => _id === enhancementId
        );

        return { label: enhancement?.label || "", price };
      })
    : [];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="max-sm:py-1 text-sm sm:mt-0.5 text-blue-400 w-fit flex items-center justify-start gap-x-2 row-start-7 col-start-2 cursor-pointer">
          <SparklesIcon
            strokeWidth={2}
            height={14}
            width={14}
          />
          <span className="w-fit">{totalCustomizations} customizations</span>
          <ChevronDown
            strokeWidth={1.5}
            width={14}
            className="sm:translate-y-[1px]"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="p-0 outline-none border border-charcoal-3/10 rounded-2xl bg-transparent min-w-fit z-[999]"
      >
        <div className="grid grid-cols-[auto_auto] rounded-2xl p-3 px-4 gap-x-3 gap-y-1.5 text-charcoal-3/80 bg-[#fcfcfa] border border-sienna-2/20">
          {enhancement && (
            <>
              <span className="col-span-2 text-sm font-medium underline underline-offset-4 text-charcoal-3/80">
                {enhancement.label}
              </span>
              {enhancementList.map(({ label, price }, index) => (
                <>
                  <span className="whitespace-nowrap flex items-center justify-start text-sm">
                    {label}
                  </span>
                  <span className="whitespace-nowrap flex items-center justify-end text-sm">
                    {INRSymbol}
                    {price}
                  </span>
                </>
              ))}
            </>
          )}

          {flavour && (
            <>
              <span className="col-span-2 text-sm font-medium underline underline-offset-4 text-charcoal-3/80 pt-2">
                {flavour.label}
              </span>
              <span className="whitespace-nowrap flex items-center justify-start text-sm">
                {flavor?.name || ""}
              </span>
              <span className="whitespace-nowrap flex items-center justify-end text-sm">
                {flavour.price > 0 ? `${INRSymbol}${flavour.price}` : "Default"}
              </span>
            </>
          )}

          {upgrade && (
            <>
              <span className="col-span-2 text-sm font-medium underline underline-offset-4 text-charcoal-3/80 pt-2">
                {upgrade.label}
              </span>
              <span className="whitespace-nowrap flex items-center justify-start text-sm">
                {upGrade?.label || ""}
              </span>
              <span className="whitespace-nowrap flex items-center justify-end text-sm">
                {upgrade.price > 0 ? `${INRSymbol}${upgrade.price}` : "Default"}
              </span>
            </>
          )}

          {balloonColor && (
            <>
              <span className="col-span-2 text-sm font-medium underline underline-offset-4 text-charcoal-3/80 pt-2">
                Selected Balloon Colors
              </span>
              <span className="col-span-2 text-sm">
                {balloonColor === "_default_"
                  ? "Same as image"
                  : balloonColor
                      .split(",")
                      .map((x) => x.trim())
                      .join(", ")}
              </span>
            </>
          )}

          {uploadedText && (
            <>
              <span className="col-span-2 text-sm font-medium underline underline-offset-4 text-charcoal-3/80 pt-2">
                {uploadedText.label}
              </span>
              <span className="col-span-2 text-sm">
                &quot;{uploadedText.text}&quot;
              </span>
            </>
          )}

          {uploadedImage && (
            <>
              <span className="col-span-2 text-sm font-medium underline underline-offset-4 text-charcoal-3/80 pt-2">
                {`${uploadedImage.label}${uploadedImage.images.length > 1 ? ` (${uploadedImage.images.length})` : ""}`}
              </span>
              <div className="flex items-center justify-start gap-1">
                {uploadedImage.images.map((imageId) => {
                  const image = customizationImages.find(
                    ({ _id }) => _id === imageId
                  );

                  if (image) {
                    return (
                      <div
                        key={imageId as string}
                        className="w-[60px] h-[60px] overflow-hidden rounded-md"
                      >
                        <Image
                          className="object-cover"
                          src={image.url}
                          alt="Customization Image"
                          width={60}
                          height={60}
                        />
                      </div>
                    );
                  }

                  return <></>;
                })}
              </div>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
