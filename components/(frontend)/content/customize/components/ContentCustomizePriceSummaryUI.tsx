// config
import { OPTIMIZE_IMAGE } from "@/config/image";

// icons
import { ArrowRight, Calendar, ChevronDown, MapPin, ShoppingCart } from "lucide-react";
import { INRSymbol } from "@/common/constants/symbols";

// utils
import { formattedDate } from "../../detail/utils/date";

// hooks
import { useMemo } from "react";

// components
import ContentCustomizePriceSummaryItem from "./ContentCustomizePriceSummaryItem";
import { DrawerTrigger } from "@/components/ui/drawer";
import Image from "next/image";

// types
import { type CartItemDeliveryDocument } from "@/common/types/documentation/nestedDocuments/cartItemDelivery";
import { type CityDocument } from "@/common/types/documentation/presets/city";
import { type CustomizationPriceSummaryItem } from "../types/priceSummary";
import { type ImageDocument } from "@/common/types/documentation/media/image";

function ContentCustomizePriceSummaryUI({
  contentName,
  contentImage: { alt, defaultAlt, url },
  cartItemDelivery,
  selectedCity,
  summary,
  totalPrice,
  onBookNow
}: {
  contentName: string;
  contentImage: ImageDocument;
  cartItemDelivery: CartItemDeliveryDocument;
  selectedCity: CityDocument | null;
  summary: CustomizationPriceSummaryItem[];
  totalPrice: number;
  onBookNow: () => void;
}) {
  const date = useMemo(
    () => (cartItemDelivery.date as Date) || new Date(),
    [cartItemDelivery]
  );

  return (
    <div className="max-sm:sticky max-sm:bottom-0 max-sm:min-h-fit max-sm:py-1.5 max-sm:px-3 px-4 sm:py-6 bg-ivory-1 sm:bg-ivory-3 z-[200] max-sm:border-y max-sm:border-y-ash/35 max-sm:grid max-sm:grid-cols-5 max-sm:gap-2 flex flex-col justify-between">
      <div className="col-span-2 flex flex-col items-start justify-center">
        <div className=" bg-ivory-1 max-sm:hidden w-full shadow-medium sm:shadow-none rounded-2xl pl-6 pr-4 pb-5 pt-7 sm:pt-4 flex flex-col items-stretch justify-stretch gap-2.5">
          <div className="max-sm:mt-2 mb-6 bg-ivory-1 shadow-light sm:shadow-none rounded-lg flex sm:flex-col items-start sm:items-center justify-start sm:justify-center gap-3">
            {/* <div className="aspect-square rounded-lg bg-ash overflow-hidden relative sm:w-24">
              <Image
                src={url}
                alt={alt || defaultAlt || "Content Image"}
                width={80}
                height={80}
                unoptimized={!OPTIMIZE_IMAGE}
                draggable="false"
                className="w-full h-full object-cover object-center"
              />
            </div> */}
            <div className="flex flex-col items-stretch justify-center gap-1">
              <span className="text-xs uppercase text-black/60 text-center">SUMMARY</span>
              <span className="truncate text-lg text-center">
                {contentName}
              </span>
              {/* <div className="flex items-center justify-start gap-1.5 overflow-x-hidden scrollbar-hide">
                {Boolean(date) && (
                  <div className="flex items-center justify-center gap-1 p-1 px-2 rounded-md bg-ash/20 border border-ash/35 text-xs">
                    <Calendar
                      strokeWidth={1.5}
                      width={13}
                      height={13}
                    />
                    <span className="whitespace-nowrap">
                      {formattedDate(date, "SHORT")}
                    </span>
                  </div>
                )}
                {selectedCity && (
                  <div className="flex items-center justify-center gap-1 p-1 px-2.5 rounded-md bg-ash/20 border border-ash/35 text-xs">
                    <MapPin
                      strokeWidth={1.5}
                      width={13}
                      height={13}
                    />
                    <span className="whitespace-nowrap">
                      {selectedCity.name}
                    </span>
                  </div>
                )}
              </div> */}
            </div>
          </div>
          <div className="grid grid-cols-[auto_80px] gap-2 items-start">
            {summary.map((item, i) => (
              <ContentCustomizePriceSummaryItem
                key={i}
                item={item}
              />
            ))}
            <span className="col-span-2 h-[1px] bg-ash my-2" />
            <span className="text-[18px] font-medium">Total</span>
            <span className="text-[18px] font-medium text-sienna">
              {`${INRSymbol} ${totalPrice}`}
            </span>
          </div>
        </div>
        <span className="text-charcoal-3/50 text-[15.5px] sm:hidden">
          {summary.length - 1} customizations
        </span>
        <DrawerTrigger className="sm:hidden">
          <span className="text-[13px] flex items-center justify-start gap-1 text-charcoal-3/90">
            <span>View Summary</span>
            <ChevronDown
              width={13}
              height={13}
              className={`transition-all duration-500`}
            />
          </span>
        </DrawerTrigger>
      </div>
      <div
        className="relative group flex items-center justify-between sm:justify-center p-2.5 px-3 sm:py-3 col-span-3 bg-moss overflow-hidden text-white rounded-md sm:rounded-xl cursor-pointer"
        onClick={onBookNow}
      >
        <div className="flex flex-col items-start sm:hidden">
          <span className="-mb-0.5">
            {INRSymbol} {totalPrice}
          </span>
          <span className="text-sienna-3/80 text-[11px]">TOTAL</span>
        </div>
        <div className="flex items-center justify-end gap-1 sm:gap-2 sm:text-xl transition-all duration-200">
          <ShoppingCart
            strokeWidth={2}
            height={16}
            width={16}
          />
          <span>Add to Cart</span>
        </div>
      </div>
    </div>
  );
}

export default ContentCustomizePriceSummaryUI;
