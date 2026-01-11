"use client";

// icons
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

// utils
import { memo } from "react";

// hooks
import { useCallback, useId } from "react";
import { useWindowSize } from "usehooks-ts";

// components
import ContentArrayItem from "./components/ContentArrayItem";

// types
import { type ContentDocument } from "@/common/types/documentation/contents/content";

function ContentArray({
  isScrollable,
  contents
}: {
  isScrollable?: boolean;
  contents: ContentDocument[];
}) {
  // hooks
  const arrayId = useId();
  const { width } = useWindowSize();

  // event handlers
  const handleScroll = useCallback(
    (dir: "left" | "right") => {
      const tray = document.getElementById(arrayId) as HTMLElement;

      const currOffset = tray.scrollLeft;

      tray.scrollTo({
        left: currOffset + (dir === "left" ? -1 : 1) * (width * 0.65),
        behavior: "smooth"
      });
    },
    [arrayId, width]
  );

  return (
    <div
      id={arrayId}
      className={`pb-2 ${isScrollable ? "relative  flex items-center justify-start gap-2 sm:gap-5 overflow-x-scroll scrollbar-hide" : `grid sm:grid-cols-3 md:grid-cols-4 gap-0 sm:gap-6 items-start justify-center`}`}
    >
      {Boolean(isScrollable && contents.length > 2) && (
        <div
          className={`max-w-9 w-9 h-9 sticky top-[calc(50%_-_20px)] sm:top-1/2 ${contents.length <= 3 ? "sm:hidden" : ""} aspect-square -translate-y-1/2 left-0 rounded-full cursor-pointer flex items-center justify-center bg-white/50 p-[8px] border border-neutral-200 text-slate-900 transition-all duration-300 hover:bg-white max-sm:-mr-10 mr-[-40px] z-50`}
          onClick={() => {
            handleScroll("left");
          }}
        >
          <ChevronLeftIcon />
        </div>
      )}
      {contents.map((content, index) => (
        <ContentArrayItem
          key={content._id as string}
          index={index}
          isScrollable={isScrollable}
          content={content}
        />
      ))}
      {Boolean(isScrollable && contents.length > 2) && (
        <div
          className={`max-w-9 w-9 h-9 sticky top-[calc(50%_-_20px)] sm:top-1/2 -translate-y-1/2 ${contents.length <= 3 ? "sm:hidden" : ""} aspect-square right-0 rounded-full cursor-pointer flex items-center border border-neutral-200 justify-center bg-white/50 p-[8px] text-slate-900 transition-all duration-300 hover:bg-white z-50`}
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

export default memo(ContentArray);
