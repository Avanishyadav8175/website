"use client";
import { INRSymbol } from "@/common/constants/symbols";
import { BasicImageType, DummyPriceDocument } from "@/common/types/types";
import { formattedDate } from "@/common/utils/formattedDate";
import {
  NonVegSymbol,
  VegSymbol
} from "@/components/(_common)/Symbols/Edibles";
import { OPTIMIZE_IMAGE } from "@/config/image";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
  Truck
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";

export type LocalProductDocument = {
  _id: string;
  name: string;
  link: string;
  price: DummyPriceDocument;
  image: BasicImageType;
  tag?: { label: string; tagColor: string };
  quality: { rating: number; reviews: number };
  earliestDeliveryBy?: Date;
  showVeganType?: true;
  isVegan?: boolean;
};

export default function ProductTiles({
  productList,
  id,
  type,
  inCategoryPage
}: {
  productList: LocalProductDocument[];
  id?: string;
  type?: "list" | "scrollable";
  inCategoryPage?: boolean;
}) {
  const [products, setProducts] = useState<LocalProductDocument[]>(
    productList || []
  );
  const [screenW, setScreenW] = useState<number>(300);

  const useIdId = useId();
  const trayId = id || useIdId;

  useEffect(() => {
    const updateWindowWidth = () => {
      setScreenW((prev) => innerWidth);
    };
    window.addEventListener("resize", updateWindowWidth);
    updateWindowWidth();
    return () => window.removeEventListener("resize", updateWindowWidth);
  }, []);

  const handleScroll = (dir: "left" | "right") => {
    const tray = document.getElementById(trayId) as HTMLElement;

    const currOffset = tray.scrollLeft;

    tray.scrollTo({
      left: currOffset + (dir === "left" ? -1 : 1) * (screenW * 0.65),
      behavior: "smooth"
    });
  };

  return (
    <div
      id={trayId}
      className={`${!type || type === "list" ? `grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-0 ${inCategoryPage ? "sm:gap-y-6 sm:gap-x-3" : "sm:gap-6"} items-start justify-center` : "relative flex items-center justify-start gap-2 sm:gap-5 overflow-x-scroll scrollbar-hide"}`}
    >
      {/* left button ------------------------- */}
      {type === "scrollable" ? (
        <div
          className="max-w-9 w-9 h-9 sticky top-1/2 aspect-square -translate-y-1/2 left-0 rounded-full cursor-pointer flex items-center justify-center bg-white/50 p-[8px] border border-neutral-200 text-slate-900 transition-all duration-300 hover:bg-white max-sm:mr-[-36px] mr-[-40px] z-50"
          onClick={() => handleScroll("left")}
        >
          <ChevronLeftIcon />
        </div>
      ) : (
        <></>
      )}

      {products.map(
        (
          {
            _id,
            image: { url, alt },
            name,
            price,
            tag,
            link,
            quality: { reviews, rating },
            earliestDeliveryBy,
            showVeganType,
            isVegan
          },
          index
        ) => (
          <Link
            href={link}
            // prefetch
            key={index}
            className={`group grid *:row-start-1 *:col-start-1 min-w-[40dvw] sm:min-w-[15dvw] ${type === "scrollable" ? "rounded-xl sm:rounded-2xl" : "rounded-none"}  h-fit min-h-fit`}
          >
            <div
              className={`relative z-20 transition-all duration-300 rounded-none sm:rounded-xl bg-ivory-1 max-sm:p-1 max-sm:border-[0.5px] border-ash/20`}
            >
              <div className="relative aspect-square max-sm:p-1 rounded-none sm:rounded-xl overflow-hidden rounded-b-none sm:rounded-b-none">
                <Image
                  src={url}
                  alt={alt || "Content Image"}
                  height={500}
                  width={500}
                  unoptimized={!OPTIMIZE_IMAGE}
                  priority
                  decoding="async"
                  className={`${type === "scrollable" ? "" : "max-sm:rounded-md"} w-full h-full object-cover object-center scale-105 group-hover:scale-100 transition-all duration-500`}
                />

                <div
                  className={`absolute bottom-1 right-1 flex items-center justify-end gap-1 text-xs sm:text-sm py-0.5 px-1.5 rounded-sm backdrop-blur-sm backdrop-brightness-105 ${rating === 5 ? "" : "bg-ivory-1/35 text-charcoal-3/90"}`}
                >
                  {rating}{" "}
                  <StarIcon
                    width={16}
                    height={16}
                    className="fill-sienna-1 stroke-transparent brightness-105"
                  />
                  | {reviews}
                </div>

                {type === "scrollable" || inCategoryPage ? (
                  <div className="absolute h-full -left-[35%] w-7 scale-y-110 bg-ivory-1/85 opacity-60 rotate-12 blur-sm z-30 top-0 transition-all duration-500 group-hover:animate-shine" />
                ) : (
                  <></>
                )}
              </div>

              <div
                className={`pt-2 flex flex-col ${type === "scrollable" ? "" : "gap-y-0.5"} rounded-sm sm:rounded-xl rounded-t-none sm:rounded-t-none overflow-hidden bg-ivory-1 mt-0 sm:border-[1.5px] sm:border-ash/40 border-t-0`}
              >
                <span
                  className={`${showVeganType ? "pr-0 grid grid-cols-[1fr_20px] items-center" : "grid grid-cols-1 items-center"} px-1 max-sm:pt-1 sm:px-3 z-30 text-[15px] sm:text-base text-charcoal-3/80 leading-tight relative `}
                >
                  <span
                    className={`${type === "scrollable" ? "line-clamp-1" : ""}`}
                  >
                    {name}
                  </span>
                  <span className="justify-self-end">
                    {showVeganType ? (
                      isVegan ? (
                        <VegSymbol className="w-[20px] sm:w-[19px] sm:max-w-[19px] sm:translate-x-1" />
                      ) : (
                        <NonVegSymbol className="w-[20px] sm:w-[19px] sm:max-w-[19px] sm:translate-x-1" />
                      )
                    ) : (
                      <></>
                    )}
                  </span>
                </span>
                <div
                  className={`px-1 sm:px-3 ${earliestDeliveryBy ? "" : "pb-2.5 sm:pb-3.5 "} relative flex items-baseline justify-start gap-2 w-full z-20`}
                >
                  <span className="text-[15px] sm:text-[18px] text-sienna-2 group-hover:text-sienna-1 transition-all duration-300">
                    {INRSymbol} {price.base.price * 100 - 1}
                  </span>
                  <del className="text-[12.5px] sm:text-[15px] text-charcoal-3/50 transition-all duration-300">
                    &nbsp;{INRSymbol} {price.base.mrp * 100 - 1}&nbsp;
                  </del>

                  {Math.ceil((1 - price.base.price / price.base.mrp) * 100) >
                  0 ? (
                    <>
                      {/* discount ---------------------------- */}
                      {/* <span className="text-sm sm:text-[15px]">
                        (
                        {Math.ceil(
                          (1 - price.base.price / price.base.mrp) * 100
                        )}
                        % off)
                      </span> */}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                {earliestDeliveryBy ? (
                  <div
                    className={`px-1 sm:px-3 pb-1.5 sm:pb-2.5 pt-1 relative flex items-center justify-start gap-1.5 w-full z-20`}
                  >
                    <Truck
                      strokeWidth={1.5}
                      width={16}
                      height={16}
                      stroke="rgb(56 56 56 / 0.8)"
                    />
                    <span className="text-sm text-charcoal-3/80 transition-all duration-300 max-sm:hidden">
                      {type === "list" ? "Earliest Delivery By:" : "Earliest:"}
                    </span>
                    <span className="text-[12.5px] text-charcoal-3/80 transition-all duration-300 sm:hidden">
                      Earliest:
                    </span>
                    <span className="text-[12.5px] text-charcoal-3/90 font-medium">
                      {formattedDate(earliestDeliveryBy, "MINI")}
                    </span>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>

            {/* background effect ---------------------------------------------------------------- */}
            <div
              className={
                type === "scrollable"
                  ? "z-30 relative bg-transparent rounded-sm sm:rounded-xl border-[1.5px] border-transparent group-hover:border-sienna-1 transition-all duration-300"
                  : "max-sm:hidden z-30 relative bg-transparent rounded-sm sm:rounded-xl border-[1.5px] border-transparent group-hover:border-sienna-1 transition-all duration-300"
              }
            />
            {!inCategoryPage && (!type || type === "list") ? (
              <div className="z-10 relative bg-transparent rounded-2xl sm:rounded-3xl">
                <div className="absolute -top-0.5 sm:-top-1 -right-0.5 sm:-right-1 scale-0 group-hover:scale-[1.15] bg-transparent border-[1.4px] sm:border-[1.9px] border-sienna-1 aspect-square w-7 sm:w-14 h-7 sm:h-14 transition-all duration-500" />
                <div className="absolute -bottom-0.5 sm:-bottom-1 -left-0.5 sm:-left-1 scale-0 group-hover:scale-[1.15] bg-transparent border-[1.4px] sm:border-[1.9px] border-sienna-1 aspect-square w-7 sm:w-14 h-7 sm:h-14 transition-all duration-500" />
              </div>
            ) : (
              <></>
            )}
          </Link>
        )
      )}

      {/* right button ------------------------- */}
      {type === "scrollable" ? (
        <div
          className="max-w-9 w-9 h-9 sticky top-1/2 -translate-y-1/2 aspect-square right-0 rounded-full cursor-pointer flex items-center border border-neutral-200 justify-center bg-white/50 p-[8px] text-slate-900 transition-all duration-300 hover:bg-white z-50"
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
