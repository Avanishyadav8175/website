// components
import { useDispatch, useSelector } from "@/store/withType";

// types
import { type CartItemCustomizationDocument } from "@/common/types/documentation/nestedDocuments/cartItemCustomization";
import {
  createFlavourAction,
  selectFlavour
} from "@/store/features/presets/flavourSlice";
import { useEffect } from "react";
import {
  createUpgradeAction,
  selectUpgrade
} from "@/store/features/presets/upgradeSlice";
import {
  createEnhancementAction,
  selectEnhancement
} from "@/store/features/presets/enhancementSlice";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { ChevronDown, SparklesIcon } from "lucide-react";
import { INRSymbol } from "@/common/constants/symbols";

export default function CartItemCustomization({
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
  const dispatch = useDispatch();

  // redux states
  const flavourStatus = useSelector(selectFlavour.status);
  const upgradeStatus = useSelector(selectUpgrade.status);
  const enhancementStatus = useSelector(selectEnhancement.status);

  const { documents: upgrades } = useSelector(selectUpgrade.documentList);
  const { documents: flavours } = useSelector(selectFlavour.documentList);
  const { documents: enhancements } = useSelector(
    selectEnhancement.documentList
  );

  const upGrade = upgrade
    ? upgrades.find(({ _id }) => _id === upgrade.upgrade)
    : undefined;

  const flavor = flavour
    ? flavours.find(({ _id }) => _id === flavour.flavour)
    : undefined;

  // side effects
  useEffect(() => {
    if (upgradeStatus === "idle") {
      dispatch(createUpgradeAction.fetchDocumentList());
    }
  }, [upgradeStatus, dispatch]);

  useEffect(() => {
    if (flavourStatus === "idle") {
      dispatch(createFlavourAction.fetchDocumentList());
    }
  }, [flavourStatus, dispatch]);

  useEffect(() => {
    if (enhancementStatus === "idle") {
      dispatch(createEnhancementAction.fetchDocumentList());
    }
  }, [enhancementStatus, dispatch]);

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
                Selected Enhancements
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
                Selected Flavor
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
                Selected Upgrade
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
                Selected Text on Cake
              </span>
              <span className="col-span-2 text-sm">
                &quot;{uploadedText.text}&quot;
              </span>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
