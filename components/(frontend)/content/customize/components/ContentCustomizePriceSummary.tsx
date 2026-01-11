// config
import { OPTIMIZE_IMAGE } from "@/config/image";

// icons
import { Calendar, MapPin } from "lucide-react";
import { INRSymbol } from "@/common/constants/symbols";

// utils
import { memo } from "react";
import { formattedDate } from "../../detail/utils/date";
import { getContentPrice } from "../../utils/getContentPrice";

// hooks
import { useMemo } from "react";

// components
import ContentCustomizePriceSummaryItem from "./ContentCustomizePriceSummaryItem";
import ContentCustomizePriceSummaryUI from "./ContentCustomizePriceSummaryUI";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import Image from "next/image";

// types
import { type CartItemCustomizationDocument } from "@/common/types/documentation/nestedDocuments/cartItemCustomization";
import { type CartItemEnhancementItemDocument } from "@/common/types/documentation/nestedDocuments/cartItemEnhancementItem";
import { type CartItemDeliveryDocument } from "@/common/types/documentation/nestedDocuments/cartItemDelivery";
import { type CityDocument } from "@/common/types/documentation/presets/city";
import { type ContentPriceDocument } from "@/common/types/documentation/nestedDocuments/contentPrice";
import { type CustomizationPriceSummaryItem } from "../types/priceSummary";
import { type ImageDocument } from "@/common/types/documentation/media/image";

function ContentCustomizePriceSummary({
  contentName,
  contentImage,
  contentPrice: contentPriceDoc,
  selectedCity,
  cartItemCustomization,
  cartItemDelivery,
  onBookNow
}: {
  contentName: string;
  contentImage: ImageDocument;
  contentPrice: ContentPriceDocument;
  selectedCity: CityDocument | null;
  cartItemCustomization: CartItemCustomizationDocument;
  cartItemDelivery: CartItemDeliveryDocument;
  onBookNow: () => void;
}) {
  const { price: contentPrice } = useMemo(
    () =>
      getContentPrice({
        price: contentPriceDoc,
        city: selectedCity
      }),
    [contentPriceDoc, selectedCity]
  );

  const enhancementsPrice = useMemo(
    () =>
      (
        cartItemCustomization?.enhancement
          ?.items as CartItemEnhancementItemDocument[]
      )?.reduce((total, { price }) => (total += price), 0) || 0,
    [cartItemCustomization?.enhancement]
  );

  const upgradePrice = useMemo(
    () => cartItemCustomization?.upgrade?.price || 0,
    [cartItemCustomization.upgrade]
  );

  const flavourPrice = useMemo(
    () => cartItemCustomization?.flavour?.price || 0,
    [cartItemCustomization.flavour]
  );

  const summary: CustomizationPriceSummaryItem[] = useMemo(
    () => [
      { label: "Base", price: contentPrice },
      ...(enhancementsPrice
        ? [
            {
              label: `Enhancements${
                cartItemCustomization?.enhancement?.items?.length
                  ? ` x${cartItemCustomization.enhancement.items.length}`
                  : ""
              }`,
              price: enhancementsPrice
            }
          ]
        : []),
      ...(upgradePrice
        ? [
            {
              label: `Upgrade`,
              price: upgradePrice
            }
          ]
        : []),
      ...(flavourPrice
        ? [
            {
              label: `Flavour`,
              price: flavourPrice
            }
          ]
        : [])
    ],
    [
      cartItemCustomization,
      contentPrice,
      enhancementsPrice,
      flavourPrice,
      upgradePrice
    ]
  );

  const totalPrice = useMemo(
    () => contentPrice + enhancementsPrice + upgradePrice + flavourPrice,
    [contentPrice, enhancementsPrice, upgradePrice, flavourPrice]
  );

  const date = useMemo(
    () => (cartItemDelivery.date as Date) || new Date(),
    [cartItemDelivery.date]
  );

  return (
    <Drawer>
      <ContentCustomizePriceSummaryUI
        contentName={contentName}
        contentImage={contentImage}
        selectedCity={selectedCity}
        cartItemDelivery={cartItemDelivery}
        summary={summary}
        totalPrice={totalPrice}
        onBookNow={onBookNow}
      />
      <DrawerContent className="p-0 outline-none focus:outline-none border-none z-[999] rounded-t-3xl">
        <div className="w-full sm:hidden bg-ivory-1 shadow-medium rounded-t-3xl px-4 pb-5 pt-7 flex flex-col items-stretch justify-start gap-2.5">
          <span className="text-xl font-medium text-charcoal-3/65">
            Summary
          </span>

          <div className="my-4 bg-ivory-1 shadow-light rounded-lg p-3 flex items-start justify-start gap-3">
            <div className="aspect-square rounded-lg w-16 bg-ash overflow-hidden relative">
              <Image
                src={contentImage.url}
                alt={
                  contentImage.alt || contentImage.defaultAlt || "Content Image"
                }
                width={80}
                height={80}
                unoptimized={!OPTIMIZE_IMAGE}
                draggable="false"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="flex flex-col items-stretch justify-center w-[calc(100%_-_76px)] gap-1">
              <span className="truncate text-lg">{contentName}</span>
              <div className="flex items-center justify-start gap-1.5 overflow-x-hidden scrollbar-hide">
                {date ? (
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
                ) : (
                  <></>
                )}
                {selectedCity ? (
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
                ) : (
                  <></>
                )}
              </div>
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
        <ContentCustomizePriceSummaryUI
          contentName={contentName}
          contentImage={contentImage}
          selectedCity={selectedCity}
          cartItemDelivery={cartItemDelivery}
          summary={summary}
          totalPrice={totalPrice}
          onBookNow={onBookNow}
        />
      </DrawerContent>
    </Drawer>
  );
}

export default memo(ContentCustomizePriceSummary);
