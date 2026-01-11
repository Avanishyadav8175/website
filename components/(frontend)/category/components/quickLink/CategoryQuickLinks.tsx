"use client";

// icons
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

// hooks
import { useCallback, useId } from "react";
import { useWindowSize } from "usehooks-ts";

// components
import CategoryQuickLinkItem from "./CategoryQuickLinkItem";

// types
import { type ClickableImageDocument } from "@/common/types/documentation/nestedDocuments/clickableImage";

export default function CategoryQuickLinks({
  quickLinks
}: {
  quickLinks: ClickableImageDocument[];
}) {
  // hooks
  const trayId = useId();
  const { width } = useWindowSize();

  // memoizes
  const noImage: boolean = Boolean(
    quickLinks.filter(({ image }) => !image).length
  );

  // event handlers
  const handleScroll = useCallback(
    (dir: "left" | "right") => {
      const tray = document.getElementById(trayId) as HTMLElement;

      const currOffset = tray.scrollLeft;

      tray.scrollTo({
        left: currOffset + (dir === "left" ? -1 : 1) * (width * 0.65),
        behavior: "smooth"
      });
    },
    [trayId, width]
  );

  return (
    <div
      id={trayId || ""}
      className={`relative grid grid-cols-3 sm:flex sm:items-start sm:justify-start overflow-auto gap-x-3.5 gap-y-2.5 sm:gap-x-7 w-full transition-all duration-300 scrollbar-hide max-sm:border-b max-sm:pb-4`}
    >
      {quickLinks.length > 6 && (
        <div
          className="max-sm:hidden max-w-9 w-8 h-8 sm:w-9 sm:h-9 sticky top-1/2 sm:top-1/2 aspect-square -translate-y-1/2 -left-1 sm:left-0 rounded-full cursor-pointer flex items-center justify-center bg-white/50 p-1.5 sm:p-2 backdrop-blur-sm border border-neutral-200 text-slate-900 transition-all duration-300 hover:bg-white max-sm:mr-[-31px] mr-[-40px] z-50"
          onClick={() => {
            handleScroll("left");
          }}
        >
          <ChevronLeftIcon />
        </div>
      )}
      {quickLinks.map((quickLink, i) => (
        <CategoryQuickLinkItem
          key={quickLink._id as string}
          index={i}
          noImage={noImage}
          quickLink={quickLink}
        />
      ))}
      {quickLinks.length > 6 && (
        <div
          className="max-sm:hidden max-w-9 w-8 h-8 sm:w-9 sm:h-9 sticky top-1/2 sm:top-1/2 -translate-y-1/2 aspect-square -right-1 sm:right-0 rounded-full cursor-pointer flex items-center border border-neutral-200 justify-center bg-white/50 p-1.5 sm:p-2 backdrop-blur-sm text-slate-900 transition-all duration-300 hover:bg-white z-50"
          onClick={() => {
            handleScroll("right");
          }}
        >
          <ChevronRightIcon />
        </div>
      )}
    </div>
  );
}
