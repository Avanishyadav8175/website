/* eslint-disable react-hooks/exhaustive-deps */

// config
import { OPTIMIZE_IMAGE } from "@/config/image";

import { BasicImageType } from "@/common/types/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const QUICK_LINKS_ID = "__hauiguirg__";

export default function FrontendCategoryListQuickLinks({
  links,
  showBanner,
  isSticky
}: {
  showBanner: boolean;
  links: Array<{
    _id: string;
    label: string;
    link: string;
    image?: BasicImageType;
  }>;
  isSticky?: boolean;
}) {
  useEffect(() => {
    const quickLinkDiv = document.getElementById(QUICK_LINKS_ID) as HTMLElement;
    const quickLinkImages = document.querySelectorAll(".quickLinksImages");

    const SHADOW = "0 0 10px 5px #4442";
    const NO_SHADOW = "0 0 0 0 #0000";

    const observeQuickLinks = () => {
      // const topOffset = quickLinkDiv.getBoundingClientRect().y;
      if (
        scrollY >=
        (innerWidth < 640 ? (showBanner ? 385 : 300) : showBanner ? 500 : 300)
      ) {
        quickLinkDiv.animate(
          {
            boxShadow: innerWidth < 640 ? SHADOW : NO_SHADOW,
            gap: "0px"
          },
          { duration: 0, fill: "forwards" }
        );
        quickLinkImages.forEach((image) =>
          image.animate({ opacity: "0" }, { duration: 0, fill: "forwards" })
        );
      } else {
        quickLinkDiv.animate(
          { boxShadow: NO_SHADOW, gap: innerWidth < 640 ? "12px" : "36px" },
          { duration: 0, fill: "forwards" }
        );
        quickLinkImages.forEach((image) =>
          image.animate({ opacity: "1" }, { duration: 0, fill: "forwards" })
        );
        // }
      }
    };

    if (quickLinkDiv) {
      addEventListener("scroll", observeQuickLinks);
      observeQuickLinks();
    }
  }, []);

  // ---- IMAGE QUICK LINKS ------------------------------------------------------------
  if (links.length && links[0].image)
    return (
      <>
        <div
          id={QUICK_LINKS_ID}
          className={`${isSticky ? "z-[800] sticky -top-[87px] sm:-top-[140px] " : ""} bg-ivory-1 flex items-center justify-start px-2 1200:px-0 gap-3 sm:gap-0 overflow-x-scroll scrollbar-hide ${showBanner ? "py-2 mt-6 mb-4" : "pt-1 pb-1"}`}
        >
          {links.map(({ label, link, image }, index) => (
            <Link
              className="group capitalize whitespace-nowrap flex flex-col justify-start items-center relative"
              key={index}
              href={link}
            >
              <div className="quickLinksImages aspect-square overflow-hidden relative w-[90px] sm:w-[140px] rounded-full">
                <Image
                  src={image?.url || "#"}
                  alt={image?.alt || "Content Image"}
                  height={200}
                  width={200}
                  unoptimized={!OPTIMIZE_IMAGE}
                  draggable={false}
                  className="w-full h-full object-cover object-center transition-all duration-300 scale-105 group-hover:scale-100"
                />
              </div>
              <span className="py-1 px-2 max-sm:text-sm truncate line-clamp-1 text-center w-full transition-all duration-300 group-hover:text-sienna">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </>
    );

  // ---- NORMAL QUICK LINKS ------------------------------------------------------------
  return (
    <div
      className={`z-[800] sticky top-0 bg-ivory-1 flex items-center justify-start px-2 1200:px-0 gap-2 sm:gap-2.5 overflow-x-scroll scrollbar-hide ${showBanner ? "py-2" : "pt-1 pb-2"}`}
    >
      {links.map(({ label, link }, index) => (
        <Link
          className="capitalize whitespace-nowrap px-4 py-1 rounded-full text-sm transition-colors duration-300 hover:text-sienna"
          href={link}
          key={index}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
