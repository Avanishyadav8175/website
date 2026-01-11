// icons
import { ChevronDown, Sparkles } from "lucide-react";

// constants
import { INRSymbol } from "@/common/constants/symbols";

// components
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

// types
import { CartItemCustomizationDocument } from "@/common/types/documentation/nestedDocuments/cartItemCustomization";
import { EnhancementDocument } from "@/common/types/documentation/presets/enhancement";
import { FlavourDocument } from "@/common/types/documentation/presets/flavour";
import { UpgradeDocument } from "@/common/types/documentation/presets/upgrade";

export default function CartItemCustomization({
  customization
}: {
  customization: CartItemCustomizationDocument;
}) {
  // variables
  const customizationData = [
    ...(customization?.enhancement?.items?.length
      ? customization.enhancement.items.map(({ enhancement, price }) => ({
          label: (enhancement as EnhancementDocument).label,
          price
        }))
      : []),
    ...(customization?.upgrade?.upgrade
      ? [
          {
            label: (customization.upgrade.upgrade as UpgradeDocument).label,
            price: customization.upgrade.price
          }
        ]
      : []),
    ...(customization?.flavour?.flavour
      ? [
          {
            label: (customization.flavour.flavour as FlavourDocument).name,
            price: customization.flavour.price
          }
        ]
      : []),
    ...(customization?.balloonColor
      ? [
          {
            label: "Balloon Colors",
            price: customization.balloonColor
          }
        ]
      : [])
  ];

  if (!customizationData.length) {
    return <></>;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="text-sm sm:mt-0.5 text-blue-400 w-fit flex items-center justify-start gap-x-2 row-start-7 col-start-2 cursor-pointer max-sm:col-span-2 max-sm:col-start-2">
          <Sparkles
            strokeWidth={2}
            height={14}
            width={14}
          />
          <span className="w-fit">{`${customizationData.length} customizations`}</span>
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
        className="p-0 outline-none border-none rounded-2xl bg-transparent min-w-fit"
      >
        <div className="flex flex-col justify-start rounded-2xl p-5 gap-3 text-charcoal-3/80 bg-[#fcfcfa] border border-sienna-2/20">
          {customizationData.map(({ label, price }, index) => (
            <div
              className={`flex items-center justify-between ${label.toLowerCase().startsWith("balloon color") ? "border-t border-charcoal-3/20 pt-3" : ""}`}
              key={index}
            >
              <span className="flex items-center justify-start gap-1.5">
                <span>{label}</span>
              </span>
              {price === 0 ? (
                <span>Default</span>
              ) : (
                <span>
                  {`${
                    label.toLowerCase().startsWith("balloon colors")
                      ? ""
                      : `${INRSymbol} `
                  }${price}`}
                </span>
              )}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
