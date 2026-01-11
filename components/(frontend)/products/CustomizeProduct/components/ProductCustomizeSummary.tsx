import { INRSymbol } from "@/common/constants/symbols";
import { ArrowRight, Calendar, ChevronDown, MapPinIcon } from "lucide-react";
import { EnhancementType, FlavorType } from "../static/type";
import { BasicImageType } from "@/common/types/types";
// import { LocalProductDateTimeType } from "@/components/pages/(frontend)/Content/components/Details/ContentDetails";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useState } from "react";
import { SetStateType } from "@/common/types/reactTypes";
import Image from "next/image";
import { formattedDate } from "@/common/utils/formattedDate";
import { LocalPincodeDocument } from "@/components/(frontend)/global/SelectCity/static/types";
import { ContentEnhancementItemDocument } from "@/common/types/documentation/nestedDocuments/contentEnhancementItem";
import { ContentFlavourItemDocument } from "@/common/types/documentation/nestedDocuments/contentFlavourItem";
import { ContentUpgradeItemDocument } from "@/common/types/documentation/nestedDocuments/contentUpgradeItem";
import { OPTIMIZE_IMAGE } from "@/config/image";
import { LocalProductDateTimeType } from "@/components/pages/(frontend)/Content/components/Details/ContentDetailsUI";

export default function FrontendProductCustomizeSummary({
  enhancements,
  flavor,
  upgrade,
  imgText,
  imgImages,
  currPincode,
  dateTime,
  baseProduct,
  onBook,
  onBack,
  pricesToShow
}: {
  enhancements: Array<ContentEnhancementItemDocument>;
  flavor: ContentFlavourItemDocument | undefined;
  upgrade: ContentUpgradeItemDocument | undefined;
  imgText: string | undefined;
  imgImages: Array<BasicImageType>;
  currPincode: LocalPincodeDocument | undefined;
  dateTime: LocalProductDateTimeType;
  baseProduct: {
    name: string;
    image: BasicImageType;
    selectedPrice: number;
  };
  onBook: () => void;
  onBack: () => void;
  pricesToShow: {
    enhancements: boolean;
    upgrade: boolean;
    flavor: boolean;
    text: boolean;
    color: boolean;
    image: boolean;
  };
}) {
  const [rotate, setRotate] = useState<boolean>(false);

  const totalPrice =
    baseProduct.selectedPrice +
    enhancements.reduce((total, { price }) => (total += price), 0) +
    (flavor?.price || 0) +
    (upgrade?.price || 0);

  const enhancementPrice = pricesToShow.enhancements
    ? [
        "Enhancements",
        `${INRSymbol} ${enhancements.reduce((total, { price }) => (total += price), 0)}`
      ]
    : [];

  const flavorPrice = pricesToShow.flavor
    ? ["Flavor", `${INRSymbol} ${flavor ? flavor.price : 0}`]
    : [];

  const upgradePrice =
    pricesToShow.upgrade && upgrade
      ? ["Upgrade", `${INRSymbol} ${upgrade.price || 0}`]
      : [];

  const summaryData = [
    "Base amount",
    `${INRSymbol} ${baseProduct.selectedPrice}`,

    ...enhancementPrice,
    ...flavorPrice,
    ...upgradePrice
  ];

  return (
    <Drawer>
      <BottomStickyRow
        totalPrice={totalPrice}
        totalCustomizations={enhancements.length + (flavor ? 1 : 0)}
        totalEnhancements={enhancements.length}
        rotate={rotate}
        setRotate={setRotate}
        baseProduct={baseProduct}
        currPincode={currPincode}
        dateTime={dateTime}
        summaryData={summaryData}
        onBook={onBook}
      />
      <DrawerContent className="p-0 outline-none focus:outline-none border-none z-[999] rounded-t-3xl">
        <div className="w-full sm:hidden bg-ivory-1 shadow-medium rounded-t-3xl px-4 pb-5 pt-7 flex flex-col items-stretch justify-start gap-2.5">
          <span className="text-xl font-medium text-charcoal-3/65">
            Summary
          </span>

          <div className="my-4 bg-ivory-1 shadow-light rounded-lg p-3 flex items-start justify-start gap-3">
            <div className="aspect-square rounded-lg w-16 bg-ash overflow-hidden relative">
              <Image
                src={baseProduct.image.url}
                alt={baseProduct.image.alt || "Content Image"}
                width={80}
                height={80}
                unoptimized={!OPTIMIZE_IMAGE}
                priority
                decoding="async"
                draggable="false"
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="flex flex-col items-stretch justify-center w-[calc(100%_-_76px)] gap-1">
              <span className="truncate text-lg">{baseProduct.name}</span>
              <div className="flex items-center justify-start gap-1.5 overflow-x-hidden scrollbar-hide">
                {dateTime.date ? (
                  <div className="flex items-center justify-center gap-1 p-1 px-2 rounded-md bg-ash/20 border border-ash/35 text-xs">
                    <Calendar
                      strokeWidth={1.5}
                      width={13}
                      height={13}
                    />
                    <span className="whitespace-nowrap">
                      {formattedDate(dateTime.date, "SHORT")}
                    </span>
                  </div>
                ) : (
                  <></>
                )}
                {currPincode && currPincode.pincode ? (
                  <div className="flex items-center justify-center gap-1 p-1 px-2.5 rounded-md bg-ash/20 border border-ash/35 text-xs">
                    <MapPinIcon
                      strokeWidth={1.5}
                      width={13}
                      height={13}
                    />
                    <span className="whitespace-nowrap">
                      {currPincode.pincode}, {currPincode.city}
                    </span>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-[auto_80px] gap-2 items-start">
            {summaryData.map((str, index) => (
              <span
                className={`${index % 2 === 0 ? "self-start" : "self-end"}`}
                key={index}
              >
                {str}{" "}
                {index === 2 && enhancements.length > 0
                  ? `x${enhancements.length}`
                  : ""}
              </span>
            ))}
            <span className="col-span-2 h-[1px] bg-ash my-2" />
            <span className="text-[18px] font-medium">Total</span>
            <span className="text-[18px] font-medium text-sienna">
              {INRSymbol} {totalPrice}
            </span>
          </div>
        </div>
        <BottomStickyRow
          totalPrice={totalPrice}
          totalCustomizations={enhancements.length + (flavor ? 1 : 0)}
          totalEnhancements={enhancements.length}
          rotate={rotate}
          setRotate={setRotate}
          baseProduct={baseProduct}
          currPincode={currPincode}
          dateTime={dateTime}
          summaryData={summaryData}
          onBook={onBook}
        />
      </DrawerContent>
    </Drawer>
  );
}

const BottomStickyRow = ({
  totalPrice,
  totalCustomizations,
  totalEnhancements,
  rotate,
  setRotate,
  currPincode,
  dateTime,
  baseProduct,
  summaryData,
  onBook
}: {
  totalPrice: number;
  totalCustomizations: number;
  totalEnhancements: number;
  rotate: boolean;
  setRotate: SetStateType<boolean>;
  currPincode: LocalPincodeDocument | undefined;
  dateTime: LocalProductDateTimeType;
  baseProduct: {
    name: string;
    image: BasicImageType;
    selectedPrice: number;
  };
  summaryData: string[];
  onBook: () => void;
}) => {
  return (
    <div className="max-sm:sticky max-sm:bottom-0 max-sm:min-h-fit max-sm:py-1.5 max-sm:px-3 px-4 sm:py-6 bg-ivory-1 sm:bg-sienna-3/60 z-[200] max-sm:border-y max-sm:border-y-ash/35 max-sm:grid max-sm:grid-cols-5 max-sm:gap-2 flex flex-col justify-between">
      <div className="col-span-2 flex flex-col items-start justify-center">
        {/* --------------------------------------- */}
        <div className=" bg-ivory-1 max-sm:hidden w-full shadow-medium sm:shadow-none rounded-2xl pl-6 pr-4 pb-5 pt-7 flex flex-col items-stretch justify-stretch gap-2.5">
          {/*           <span className="text-xl font-medium text-charcoal-3/65">
            Summary
          </span> */}

          <div className="mt-2 mb-6 bg-ivory-1 shadow-light sm:shadow-none rounded-lg flex sm:flex-col items-start sm:items-center justify-start sm:justify-center gap-3">
            <div className="aspect-square rounded-lg bg-ash overflow-hidden relative sm:w-24">
              <Image
                src={baseProduct.image.url}
                alt={baseProduct.image.alt || "Content Image"}
                width={80}
                height={80}
                unoptimized={!OPTIMIZE_IMAGE}
                priority
                decoding="async"
                draggable="false"
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="flex flex-col items-stretch justify-center gap-1">
              <span className="truncate text-lg text-center">
                {baseProduct.name}
              </span>
              <div className="flex items-center justify-start gap-1.5 overflow-x-hidden scrollbar-hide">
                {dateTime.date ? (
                  <div className="flex items-center justify-center gap-1 p-1 px-2 rounded-md bg-ash/20 border border-ash/35 text-xs">
                    <Calendar
                      strokeWidth={1.5}
                      width={13}
                      height={13}
                    />
                    <span className="whitespace-nowrap">
                      {formattedDate(dateTime.date, "SHORT")}
                    </span>
                  </div>
                ) : (
                  <></>
                )}
                {currPincode && currPincode._id && currPincode.pincode ? (
                  <div className="flex items-center justify-center gap-1 p-1 px-2.5 rounded-md bg-ash/20 border border-ash/35 text-xs">
                    <MapPinIcon
                      strokeWidth={1.5}
                      width={13}
                      height={13}
                    />
                    <span className="whitespace-nowrap">
                      {currPincode.pincode}, {currPincode.city}
                    </span>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-[auto_80px] gap-2 items-start">
            {summaryData.map((str, index) => (
              <span
                className={`${index % 2 === 0 ? "self-start" : "self-end"}`}
                key={index}
              >
                {str}{" "}
                {index === 2 && totalEnhancements > 0
                  ? `x${totalEnhancements}`
                  : ""}
              </span>
            ))}
            <span className="col-span-2 h-[1px] bg-ash my-2" />
            <span className="text-[18px] font-medium">Total</span>
            <span className="text-[18px] font-medium text-sienna">
              {INRSymbol} {totalPrice}
            </span>
          </div>
        </div>

        {/* --------------------------------------- */}

        <span className="text-charcoal-3/50 text-[15.5px] sm:hidden">
          {totalCustomizations} customizations
        </span>
        <DrawerTrigger
          onClick={() => setRotate((prev) => !prev)}
          className="sm:hidden"
        >
          <span className="text-[13px] flex items-center justify-start gap-1 text-charcoal-3/90">
            <span>View Summary</span>
            <ChevronDown
              width={13}
              height={13}
              className={`transition-all duration-500 ${rotate ? "rotate-180" : "rotate-0"}`}
            />
          </span>
        </DrawerTrigger>
      </div>
      <div
        className="relative group flex items-center justify-between sm:justify-center p-2.5 px-3 sm:py-3 col-span-3 bg-sienna sm:bg-charcoal-2 overflow-hidden text-white rounded-md sm:rounded-xl cursor-pointer"
        onClick={onBook}
      >
        <div className="flex flex-col items-start sm:hidden">
          <span className="-mb-0.5">
            {INRSymbol} {totalPrice}
          </span>
          <span className="text-sienna-3/80 text-[11px]">TOTAL</span>
        </div>
        <div className="flex items-center justify-end gap-1 sm:gap-2 sm:text-xl transition-all duration-200 sm:group-hover:gap-3">
          <span>Book Now</span>
          <ArrowRight
            strokeWidth={2}
            height={16}
            width={16}
            className="sm:hidden"
          />
          <ArrowRight
            strokeWidth={2.5}
            height={17}
            width={17}
            className="max-sm:hidden translate-y-[1px]"
          />
        </div>

        <div className="absolute h-full -left-[35%] w-7 scale-y-110 bg-sienna-3/60 opacity-60 rotate-12 blur-md z-30 top-0 animate-shine-infinite-slow" />
      </div>
    </div>
  );
};
