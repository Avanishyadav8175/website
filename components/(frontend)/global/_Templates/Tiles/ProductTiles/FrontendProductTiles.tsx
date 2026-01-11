"use client";

// config
import { OPTIMIZE_IMAGE } from "@/config/image";

// libraries
import moment from "moment";

// icons
import { ChevronLeftIcon, ChevronRightIcon, Star } from "lucide-react";

// animation
import { ShineAnimation } from "../../../ShineAnimation/ShineAnimation";

// constants
import { INRSymbol } from "@/common/constants/symbols";
import { FRONTEND_LINKS } from "@/common/routes/frontend/staticLinks";
import {
  NonVegSymbol,
  VegSymbol
} from "@/components/(_common)/Symbols/Edibles";

// utils
import { getChromaticallyAbberatedShade } from "@/common/helpers/getChromaticallyABberatedShade";
import { getCityWiseContentPrices } from "@/common/helpers/getCityWiseContentPrices";

// hooks
import { useAppStates } from "@/hooks/useAppState/useAppState";
import { useEffect, useId, useState } from "react";

// components
import Image from "next/image";
import Link from "next/link";

// types
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { type ContentDeliveryDocument } from "@/common/types/documentation/nestedDocuments/contentDelivery";
import { type ContentQualityDocument } from "@/common/types/documentation/nestedDocuments/contentQuality";
import { type EdibleDocument } from "@/common/types/documentation/nestedDocuments/edible";
import { type ColorDocument } from "@/common/types/documentation/presets/color";
import { type ProcessingTimeDocument } from "@/common/types/documentation/presets/processingTime";
import { type PromotionTagDocument } from "@/common/types/documentation/presets/promotionTag";
import { getRatingValue } from "@/components/(frontend)/content/utils/getRatingValue";
import { type ContentsSortType } from "@/components/pages/(frontend)/CategoryList/static/types";

export default function FrontendProductTilesUI({
  id,
  type,
  currSort,
  inAdmin,
  inCategoryPage,
  inHomePage,
  sync,
  extraCurved,
  limit,
  productList
}: {
  id?: string;
  type?: "list" | "scrollable";
  currSort?: ContentsSortType;
  inAdmin?: boolean;
  inCategoryPage?: boolean;
  inHomePage?: boolean;
  sync?: boolean;
  extraCurved?: boolean;
  limit?: number;
  productList: ContentDocument[];
}) {
  const {
    location: {
      data: { selectedCity }
    }
  } = useAppStates();

  const [products, setProducts] = useState<ContentDocument[]>(
    productList || []
  );
  const [screenW, setScreenW] = useState<number>(0);
  const [isMounted, setIsMounted] = useState(false);

  const useIdId = useId();
  const trayId = id || useIdId;

  useEffect(() => {
    setIsMounted(true);
    const updateWindowWidth = () => {
      setScreenW(window.innerWidth);
    };
    updateWindowWidth();
    window.addEventListener("resize", updateWindowWidth);
    return () => window.removeEventListener("resize", updateWindowWidth);
  }, []);

  const handleScroll = (dir: "left" | "right") => {
    const tray = document.getElementById(trayId) as HTMLElement;
    if (!tray) return;

    const currOffset = tray.scrollLeft;
    const scrollAmount = screenW > 0 ? screenW * 0.65 : 300;

    tray.scrollTo({
      left: currOffset + (dir === "left" ? -1 : 1) * scrollAmount,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    if (sync || inAdmin) {
      setProducts((prev) => productList);
    }
  }, [sync, inAdmin, productList]);

  return (
    <div
      id={trayId}
      className={`${!type || type === "list" ? `grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-0 ${inCategoryPage || inHomePage ? "sm:gap-y-6 sm:gap-x-3" : "sm:gap-6"} items-start justify-center` : "relative flex items-center justify-start gap-2 sm:gap-5 overflow-x-scroll scrollbar-hide "}`}
    >
      {/* left button ------------------------- */}
      {type === "scrollable" && products.length > 2 ? (
        <div
          className={`max-w-9 w-9 h-9 sticky top-[calc(50%_-_20px)] sm:top-1/2 ${products.length <= 3 ? "sm:hidden" : ""} aspect-square -translate-y-1/2 left-0 rounded-full cursor-pointer flex items-center justify-center bg-white/50 p-[8px] border border-neutral-200 text-slate-900 transition-all duration-300 hover:bg-white max-sm:mr-[-36px] mr-[-40px] z-50`}
          onClick={() => handleScroll("left")}
        >
          <ChevronLeftIcon />
        </div>
      ) : (
        <></>
      )}

      {products.slice(0, limit || products.length).map((content, index) => {
        const {
          _id,
          media: { primary },
          name,
          price,
          slug,
          quality,
          edible,
          delivery,
          type: contentType
        } = content;

        const { mrp: contentMrp, price: contentPrice } = inAdmin
          ? { mrp: 0, price: 0 }
          : inCategoryPage
            ? // @ts-ignore
            { mrp: content.price.mrp, price: content.price.price }
            : getCityWiseContentPrices({ city: selectedCity, content });

        // console.log({ contentMrp, contentPrice, content });

        const showVeganType = edible
          ? (edible as EdibleDocument).isEdible
          : false;

        const isVegan: "unspecified" | "veg" | "non-veg" | undefined =
          edible && (edible as EdibleDocument).isEdible
            ? (edible as EdibleDocument).type || "unspecified"
            : undefined;

        const minProcessingTime = inAdmin
          ? 0
          : (delivery
            ? (
              (delivery as ContentDeliveryDocument)
                .processingTime as ProcessingTimeDocument
            ).hours || 0
            : 0) +
          new Date().getHours() +
          1;

        let extraDays = Math.floor(minProcessingTime / 24);
        const offsetHrs = minProcessingTime % 24;

        // const availableTimeSlots = inAdmin
        //   ? undefined
        //   : delivery
        //     ? (delivery as ContentDeliveryDocument).slots
        //         ?.map(({ type, timeSlots }) =>
        //           (type as DeliveryTypeDocument).timeSlots
        //             .filter(({ _id }) =>
        //               (timeSlots as string[]).includes(_id as string)
        //             )
        //             .map(({ startTime }) => startTime)
        //         )
        //         ?.reduce((slots, slot) => (slots = [...slots, ...slot]), [])
        //     : [];

        // const hasAvailableSlot = availableTimeSlots
        //   ? availableTimeSlots
        //       .map((t) => parseInt(t.substring(0, 2)) > offsetHrs)
        //       .reduce((ans, val) => (ans ||= val), false)
        //   : undefined;

        const hasAvailableSlot = undefined;

        if (hasAvailableSlot === false) extraDays += 1;

        let earliestDeliveryBy = "";

        if (extraDays === 0) earliestDeliveryBy = "Today";
        else if (extraDays === 1) earliestDeliveryBy = "Tomorrow";
        else
          earliestDeliveryBy = `Get it by ${moment()
            .add(extraDays, "days")
            .format("Do MMM")}`;

        const sticker =
          content.tag && content.tag.promotionTag && inAdmin !== true
            ? {
              label: (content.tag.promotionTag as PromotionTagDocument).name,
              bgColor: (
                (content.tag.promotionTag as PromotionTagDocument)
                  .color as ColorDocument
              ).hexCode,
              textColor: getChromaticallyAbberatedShade(
                (
                  (content.tag.promotionTag as PromotionTagDocument)
                    .color as ColorDocument
                ).hexCode
              )
            }
            : undefined;

        return (
          <Link
            href={`${contentType === "product" ? FRONTEND_LINKS.PRODUCT_PAGE : FRONTEND_LINKS.SERVICE_PAGE}/${slug}`}
            key={index}
            className={`group grid *:row-start-1 *:col-start-1 ${!type || type === "list" ? `min-w-[40dvw] sm:min-w-[15dvw]` : "min-w-[calc(50dvw_-_20px)] max-w-[calc(50dvw_-_20px)] sm:min-w-[20dvw] sm:max-w-[20dvw]"} ${type === "scrollable" ? "rounded-xl sm:rounded-2xl" : "rounded-none"} h-fit min-h-fit`}
          >
            <div
              className={`relative z-20 transition-all duration-300 rounded-none sm:rounded-xl bg-ivory-1 ${!type || type === "list" ? `${index > 1 ? "max-sm:border-t-[0.5px]" : ""} max-sm:pt-2.5 max-sm:pb-1 ${index % 2 === 0 ? "max-sm:pl-2.5 max-sm:pr-[6px]" : "max-sm:pl-[6px] max-sm:pr-2.5"}` : ""} ${index % 2 === 0 || type === "scrollable" ? "" : "max-sm:border-l-[0.5px]"} border-ash/25 ${type === "scrollable" ? "rounded-xl" : ""}`}
            >
              <div
                className={`relative aspect-square max-sm:p-1 ${type === "scrollable" ? "rounded-lg" : "rounded-none rounded-b-none sm:rounded-b-none"} sm:rounded-xl overflow-hidden `}
              >
                <Image
                  src={(primary as ImageDocument)?.url || ""}
                  alt={
                    (primary as ImageDocument)?.alt ||
                    name ||
                    (primary as ImageDocument)?.defaultAlt ||
                    "Content Image"
                  }
                  height={500}
                  width={500}
                  quality={25}
                  unoptimized={!OPTIMIZE_IMAGE}
                  className={`${type === "scrollable" ? "rounded-lg" : extraCurved ? "max-sm:rounded-xl" : "max-sm:rounded-md"} w-full h-full object-cover object-center scale-105 group-hover:scale-100 transition-all duration-500`}
                />
                <span className="absolute bottom-1 left-1 sm:left-1">
                  {showVeganType ? (
                    isVegan === "veg" ? (
                      <VegSymbol className="w-[20px] sm:w-[19px] sm:max-w-[19px] sm:translate-x-1" />
                    ) : isVegan === "non-veg" ? (
                      <NonVegSymbol className="w-[20px] sm:w-[19px] sm:max-w-[19px] sm:translate-x-1" />
                    ) : (
                      <></>
                    )
                  ) : (
                    <></>
                  )}
                </span>

                {sticker && (
                  <div
                    className="absolute top-2 right-0 py-1 px-2 sm:px-3 rounded-l-lg text-xs sm:text-sm"
                    style={{
                      background: sticker.bgColor,
                      color: sticker.textColor
                    }}
                  >
                    {sticker.label}
                  </div>
                )}

                {/* {(quality as ContentQualityDocument)?.rating?.count && (
                      <div
                        className={`absolute bottom-1 right-1 flex items-center justify-end gap-1 text-xs sm:text-sm py-0.5 px-1.5 rounded-sm backdrop-blur-sm backdrop-brightness-105 ${(quality as ContentQualityDocument)?.rating?.count === 5 ? "" : "bg-ivory-1/35 text-charcoal-3/90"}`}
                      >
                        {(quality as ContentQualityDocument)?.rating?.value || 5}{" "}
                        <StarIcon
                          width={16}
                          height={16}
                          className="fill-sienna-1 stroke-transparent brightness-105"
                        />
                        | {(quality as ContentQualityDocument)?.rating?.count}
                      </div>
                    )} */}

                {type === "scrollable" || inCategoryPage || inHomePage ? (
                  <ShineAnimation />
                ) : (
                  <></>
                )}
              </div>

              <div
                className={`relative pt-2 flex flex-col ${type === "scrollable" ? "" : "gap-y-0.5"} rounded-sm sm:rounded-xl rounded-t-none sm:rounded-t-none overflow-hidden bg-ivory-1 mt-0 sm:border-[1.5px] sm:border-ash/40 border-t-0`}
              >
                <div
                  className={`${showVeganType ? "pr-0 grid grid-cols-[1fr_20px] items-center" : "grid grid-cols-1 items-center"} px-1 max-sm:pt-1 sm:px-3 z-30 text-[15px] sm:text-base text-charcoal-3/80 leading-tight relative `}
                >
                  <div
                    className={` ${type === "scrollable" ? "line-clamp-1" : "line-clamp-1 pt-0.5 pb-0.5"} leading-tight`}
                  >
                    {name}
                  </div>

                  {/* <span className="justify-self-end">
                        {showVeganType ? (
                          isVegan === "veg" ? (
                            <VegSymbol className="w-[20px] sm:w-[19px] sm:max-w-[19px] sm:translate-x-1" />
                          ) : isVegan === "non-veg" ? (
                            <NonVegSymbol className="w-[20px] sm:w-[19px] sm:max-w-[19px] sm:translate-x-1" />
                          ) : (
                            <></>
                          )
                        ) : (
                          <></>
                        )}
                      </span> */}
                </div>
                <div
                  className={`px-1 sm:px-3 ${false ? "" : contentType !== "service" && earliestDeliveryBy && earliestDeliveryBy.length > 0 ? "" : " "} relative flex items-baseline justify-start gap-2 w-full z-20`}
                >
                  {contentPrice && (
                    <div className="text-[14px] sm:text-[18px] text-charcoal-3 group-hover:text-sienna-1 flex items-center justify-start gap-3 font-semibold transition-all duration-300">
                      {inAdmin ? "" : INRSymbol}{" "}
                      {inAdmin ? "Price" : contentPrice}
                      {inAdmin ? "" :
                        contentPrice && contentMrp && Math.ceil((1 - contentPrice / contentMrp) * 100) > 0 ? (
                          <div className="text-sm font-medium text-green-700">
                            {`${Math.ceil((1 - contentPrice / contentMrp) * 100)}% off`}
                          </div>
                        ) : (<></>)}
                    </div>
                  )}
                  {/* {contentMrp > 0 && (
                    <del className="text-[12.5px] sm:text-[15px] text-charcoal-3/50 transition-all duration-300">
                      &nbsp;{INRSymbol} {contentMrp}&nbsp;
                    </del>
                  )} */}
                  {/* {(quality as ContentQualityDocument)?.rating &&
                    (quality as ContentQualityDocument)?.rating?.value ? (
                    <div className="flex items-center justify-start gap-1 text-xs sm:text-sm text-charcoal-3/80 sm:ml-1.5 translate-y-1 sm:translate-y-0.5">
                      <StarIcon
                        width={16}
                        height={16}
                        className="fill-sienna-1 stroke-transparent brightness-105 max-sm:scale-90"
                      />
                      {alwaysDecimal(
                        (quality as ContentQualityDocument)?.rating?.value || 5
                      )}{" "}
                    </div>
                  ) : (
                    <></>
                  )} */}

                  {/* {contentMrp &&
                  contentPrice &&
                  Math.ceil((1 - contentPrice / contentMrp) * 100) > 0 ? (
                    <div className="text-[10.5px] ml-1 leading-none bg-emerald-700 text-white py-0.5 px-2 rounded-full font-medium">
                      {Math.ceil((1 - contentPrice / contentMrp) * 100)}% off
                    </div>
                  ) : (
                    <></>
                  )} */}
                </div>

                {/* {(quality as ContentQualityDocument)?.rating?.count && (
                  <div
                    className={`sm:absolute ${earliestDeliveryBy && earliestDeliveryBy.length > 0 ? "sm:bottom-9" : "sm:bottom-3"} sm:right-2 max-sm:pb-1.5 max-sm:pt-1 flex items-center justify-start sm:justify-end gap-1 text-xs sm:text-sm py-0.5 pl-1 sm:px-0 rounded-full backdrop-brightness-105 ${(quality as ContentQualityDocument)?.rating?.count === 5 ? "" : "bg-transparent text-charcoal-3/90"}`}
                  >
                    {(quality as ContentQualityDocument)?.rating?.value || 5}{" "}
                    <StarIcon
                      width={16}
                      height={16}
                      className="fill-sienna-1 stroke-transparent brightness-105 scale-95"
                    />
                    | {(quality as ContentQualityDocument)?.rating?.count}
                  </div>
                )} */}

                {/* {!inAdmin &&
                earliestDeliveryBy &&
                earliestDeliveryBy.length > 0 ? (
                  <div
                    className={`px-1 sm:px-3 pb-1.5 sm:pb-2 pt-0.5 relative flex items-center justify-start gap-1.5 w-full z-20`}
                  >
                    <div className="flex items-center justify-start gap-x-1.5 bg-gradient-to-r from-transparent to-green-200/95 text-green-800/95 w-fit pr-3 py-1 rounded-lg">
                      <Zap
                        strokeWidth={1.5}
                        width={15}
                        height={15}
                        // stroke="rgb(56 56 56 / 0.8)"
                      />
                      <span className="max-sm:text-[12.5px] text-sm font-medium">
                        {earliestDeliveryBy}
                      </span>
                    </div>
                  </div>
                ) : (
                  <></>
                )} */}

                <div className="flex text-charcoal-3/70 px-1.5 text-sm font-medium sm:px-3.5 pb-3 items-center justify-start gap-x-1">
                  <Star className="fill-amber-500 text-amber-500" width={15} height={15} />
                  <span>{getRatingValue((quality as ContentQualityDocument)?.rating?.value || 5)}</span>
                  <span>({(quality as ContentQualityDocument)?.rating?.count} reviews)</span>
                </div>

                {/* {contentType === "service" && !inAdmin ? (
                    <div
                      className={`px-1 sm:px-3 pb-1.5 sm:pb-2.5 pt-0.5 relative flex items-center justify-start gap-1.5 text-sm text-green-800 z-20`}
                    >
                      You save {INRSymbol}
                      {contentMrp - contentPrice}
                    </div>
                  ) : (
                    <></>
                  )} */}
              </div>
            </div>

            {/* background effect ---------------------------------------------------------------- */}
            <div
              className={
                type === "scrollable"
                  ? "z-30 relative bg-transparent rounded-md sm:rounded-xl border border-transparent group-hover:border-charcoal-3/10 transition-all duration-300"
                  : "max-sm:hidden z-30 relative bg-transparent rounded-md sm:rounded-xl border border-transparent group-hover:border-charcoal-3/10 transition-all duration-300"
              }
            />
            {!inCategoryPage && !inHomePage && (!type || type === "list") ? (
              <div className="z-10 relative bg-transparent rounded-2xl sm:rounded-3xl">
                <div className="absolute -top-0.5 sm:-top-1 -right-0.5 sm:-right-1 scale-0 group-hover:scale-[1.15] bg-transparent border-[1.4px] sm:border-[1.9px] border-sienna-1 aspect-square w-7 sm:w-14 h-7 sm:h-14 transition-all duration-500" />
                <div className="absolute -bottom-0.5 sm:-bottom-1 -left-0.5 sm:-left-1 scale-0 group-hover:scale-[1.15] bg-transparent border-[1.4px] sm:border-[1.9px] border-sienna-1 aspect-square w-7 sm:w-14 h-7 sm:h-14 transition-all duration-500" />
              </div>
            ) : (
              <></>
            )}
          </Link>
        );
      })}

      {/* right button ------------------------- */}
      {type === "scrollable" && products.length > 2 ? (
        <div
          className={`max-w-9 w-9 h-9 sticky top-[calc(50%_-_20px)] sm:top-1/2 -translate-y-1/2 ${products.length <= 3 ? "sm:hidden" : ""} aspect-square right-0 rounded-full cursor-pointer flex items-center border border-neutral-200 justify-center bg-white/50 p-[8px] text-slate-900 transition-all duration-300 hover:bg-white z-50`}
          onClick={() => handleScroll("right")}
        >
          <ChevronRightIcon />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
