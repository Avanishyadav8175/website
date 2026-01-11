"use client";
import { ClassNameType } from "@/common/types/reactTypes";
import { BasicImageType } from "@/common/types/types";
import { OPTIMIZE_IMAGE } from "@/config/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import ShineAnimation from "../../ShineAnimation/ShineAnimation";

type LocalCategoryDocument = {
  _id: string;
  label: string;
  link: string;
  image: BasicImageType;
};

export default function Categories({
  categoryList,
  columns,
  shape,
  className,
  scrollable,
  asPreview,
  asCategoryPageQuickLink
}: {
  categoryList: LocalCategoryDocument[];
  columns: number;
  shape: "circle" | "square";
  className?: ClassNameType;
  scrollable?: boolean;
  asPreview?: boolean;
  asCategoryPageQuickLink?: boolean;
}) {
  const [screenW, setScreenW] = useState<number>(0);
  const [isMounted, setIsMounted] = useState(false);

  const trayId = useId();

  const hasNoImages: boolean = categoryList
    .map(({ image: { url } }) => url)
    .filter((x) => x !== undefined)
    .reduce((acc, val) => (acc ||= val.length === 0), false);

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
    setIsMounted(true);
    const updateWindowWidth = () => {
      setScreenW(window.innerWidth);
    };
    updateWindowWidth();
    window.addEventListener("resize", updateWindowWidth);
    return () => window.removeEventListener("resize", updateWindowWidth);
  }, []);

  return (
    <div
      id={trayId || ""}
      className={`${scrollable ? `px-3 relative flex ${asCategoryPageQuickLink ? "items-start" : "items-center"} justify-start overflow-auto` : hasNoImages ? `flex items-center justify-start gap-x-3 *:max-sm:px-3 *:px-4 *:py-1.5 *:rounded-xl *:transition-all *:duration-300` : `grid ${columns > 4 ? (columns === 6 ? "max-sm:grid-cols-3" : columns === 5 ? "max-sm:grid-cols-3" : "") : "max-sm:grid-cols-2"} grid-cols-${columns || 2}`} ${shape === "circle" ? `gap-x-5 gap-y-4 ${scrollable ? (asCategoryPageQuickLink ? "sm:gap-x-4" : "sm:gap-x-10") : "sm:gap-x-16"} sm:gap-y-8 ${asCategoryPageQuickLink ? "max-sm:px-4" : "max-sm:px-1"} ${scrollable ? "" : "px-9"} sm:py-3` : `gap-x-3.5 gap-y-2.5 ${scrollable ? "sm:gap-x-7" : "sm:gap-x-4"}`} ${asCategoryPageQuickLink ? "pl-3" : ""} w-full transition-all duration-300 scrollbar-hide`}
    >
      {/* left button ------------------------- */}
      {scrollable || asCategoryPageQuickLink ? (
        <>
          {/* {categoryList.length > 3 && (
            <div
              className="sm:hidden max-w-9 w-8 h-8 sm:w-9 sm:h-9 sticky top-1/2 sm:top-1/2 aspect-square -translate-y-1/2 -left-1 sm:left-0 rounded-full cursor-pointer flex items-center justify-center bg-white/50 p-1.5 sm:p-2 backdrop-blur-sm border border-neutral-200 text-slate-900 transition-all duration-300 hover:bg-white max-sm:mr-[-31px] mr-[-40px] z-50"
              onClick={() => handleScroll("left")}
            >
              <ChevronLeftIcon />
            </div>
          )} */}
          {categoryList.length >
            (asCategoryPageQuickLink && shape === "circle" ? 4 : 6) && (
              <div
                className="max-sm:hidden max-w-9 w-8 h-8 sm:w-9 sm:h-9 sticky top-1/2 sm:top-1/2 aspect-square -translate-y-1/2 -left-1 sm:left-0 rounded-full cursor-pointer flex items-center justify-center bg-white/50 p-1.5 sm:p-2 backdrop-blur-sm border border-neutral-200 text-slate-900 transition-all duration-300 hover:bg-white max-sm:mr-[-31px] mr-[-40px] z-50"
                onClick={() => handleScroll("left")}
              >
                <ChevronLeftIcon />
              </div>
            )}
        </>
      ) : (
        <></>
      )}

      {categoryList.map(({ label, link, image: { alt, url } }, index) => (
        <Link
          href={link || "#"}
          key={index}
          className={`group flex items-center justify-center flex-col ${shape === "circle" ? "gap-2.5 sm:gap-4" : "gap-1.5 sm:gap-2"} ${asCategoryPageQuickLink && hasNoImages ? "w-fit px-5 py-3 rounded-lg border border-charcoal-3/20" : scrollable ? (asCategoryPageQuickLink && shape === "circle" ? "min-w-[calc(calc(100dvw_-_70px)_/_2.2)] max-sm:py-1.5 sm:min-w-[240px] sm:max-w-[240px]" : "min-w-[calc(calc(100dvw_-_70px)_/_2.2)] max-sm:py-1.5 sm:min-w-[150px] sm:max-w-[150px]") : ""} max-w-[300px] ${hasNoImages ? "hover:bg-sienna-3/10 hover:border-sienna *:hover:text-sienna" : ""} transition-all duration-300`}
        >
          {hasNoImages !== true && (
            <div
              className={`relative overflow-hidden bg-charcoal-3/20 w-full ${shape === "square" ? "rounded-xl aspect-square" : asCategoryPageQuickLink ? "rounded-lg aspect-[4/3] sm:aspect-video" : "rounded-full aspect-square"} ${shape === "circle" && !asCategoryPageQuickLink ? "ring-2 sm:ring-4 ring-offset-[3px] sm:ring-offset-4 ring-sienna/70" : ""}  grid place-items-center overflow-hidden relative`}
            >
              <Image
                src={url || "/placeholder.png"}
                alt={alt || "Category Image"}
                width={500}
                height={500}
                quality={25}
                unoptimized={!OPTIMIZE_IMAGE}
                draggable={false}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder.png";
                }}
                className={`w-full h-full object-contain object-center scale-105 group-hover:scale-100 transition-all duration-300 ${shape === "circle" ? "" : "border border-transparent group-hover:border-sienna rounded-xl"}`}
              />
              <ShineAnimation />
            </div>
          )}
          {label && label.length > 0 ? (
            <h2
              className={`flex items-center justify-center text-center text-sm sm:text-base truncate w-full max-w-full text-charcoal-3 font-medium ${asCategoryPageQuickLink ? "flex-wrap gap-x-1 whitespace-nowrap" : "line-clamp-1"} transition-all duration-300`}
            >
              {asCategoryPageQuickLink && !hasNoImages
                ? label
                  .split(" ")
                  .map((str, index) => <span key={index}>{str}</span>)
                : label}
            </h2>
          ) : (
            <></>
          )}
        </Link>
      ))}

      {/* right button ------------------------- */}
      {scrollable || asCategoryPageQuickLink ? (
        <>
          {/* {categoryList.length > 3 && (
            <div
              className="sm:hidden max-w-9 w-8 h-8 sm:w-9 sm:h-9 sticky top-1/2 sm:top-1/2 -translate-y-1/2 aspect-square -right-1 sm:right-0 rounded-full cursor-pointer flex items-center border border-neutral-200 justify-center bg-white/50 p-1.5 sm:p-2 backdrop-blur-sm text-slate-900 transition-all duration-300 hover:bg-white z-50"
              onClick={() => handleScroll("right")}
            >
              <ChevronRightIcon />
            </div>
          )} */}
          {categoryList.length >
            (asCategoryPageQuickLink && shape === "circle" ? 4 : 6) && (
              <div
                className="max-sm:hidden max-w-9 w-8 h-8 sm:w-9 sm:h-9 sticky top-1/2 sm:top-1/2 -translate-y-1/2 aspect-square -right-1 sm:right-0 rounded-full cursor-pointer flex items-center border border-neutral-200 justify-center bg-white/50 p-1.5 sm:p-2 backdrop-blur-sm text-slate-900 transition-all duration-300 hover:bg-white z-50"
                onClick={() => handleScroll("right")}
              >
                <ChevronRightIcon />
              </div>
            )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
