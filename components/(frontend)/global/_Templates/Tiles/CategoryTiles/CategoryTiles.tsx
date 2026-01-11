"use client";
import { ClassNameType } from "@/common/types/reactTypes";
import { BasicImageType } from "@/common/types/types";
import { OPTIMIZE_IMAGE } from "@/config/image";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type LocalCategoryDocument = {
  _id: string;
  label: string;
  link: string;
  image: BasicImageType;
};

export default function CategoryTiles({
  categoryList,
  theme,
  layoutType,
  className,
  asPreview
}: {
  categoryList?: LocalCategoryDocument[];
  theme?: "circle" | "spade";
  layoutType?: "large" | "default" | "dual";
  className?: ClassNameType;
  asPreview?: boolean;
}) {
  const [categories, setCategories] = useState<LocalCategoryDocument[]>(
    categoryList || []
  );

  return (
    <div
      className={`grid ${!layoutType || layoutType === "default" ? "grid-cols-3 sm:grid-cols-5 md:grid-cols-6" : layoutType === "dual" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 sm:grid-cols-4"} gap-3 items-center justify-center ${className || ""}`}
    >
      {categories
        .filter((_, index) => (layoutType === "dual" ? index < 2 : true))
        .map(({ _id, image: { url, alt }, label, link }, index) => (
          <Link
            href={link}
            // prefetch
            key={index}
            className="group flex flex-col gap-2 items-center justify-center"
          >
            <div
              className={`grid place-items-center *:row-start-1 *:col-start-1 ${layoutType === "dual" ? "aspect-[2.5/1] *:aspect-[2.5/1]" : "aspect-square *:aspect-square"}  *:w-full ${!layoutType || layoutType === "default" ? "*:max-w-[180px]" : ""} w-full `}
            >
              <div
                className={`relative z-20 overflow-hidden ${!theme || theme === "spade" ? "rounded-2xl group-hover:scale-95 border-[1.5px] sm:border-[2px] border-transparent group-hover:border-sienna" : "rounded-full"} transition-all duration-300`}
              >
                <Image
                  src={url}
                  alt={alt}
                  height={250}
                  width={250}
                  unoptimized={!OPTIMIZE_IMAGE}
                  priority
                  decoding="async"
                  className={`w-full h-full object-cover object-center ${!theme || theme === "spade" ? "group-hover:scale-110" : "scale-105 group-hover:scale-100"} transition-all duration-300`}
                />
                <div className="absolute h-full -left-[35%] w-7 scale-y-110 bg-ivory-1/85 opacity-60 rotate-12 blur-sm z-30 top-0 transition-all duration-500 group-hover:animate-shine" />
              </div>
              {!theme || theme === "spade" ? (
                <div className="z-10 relative">
                  <div className="absolute -top-0.5 -right-0.5 scale-0 group-hover:scale-125 bg-transparent border-[1.4px] sm:border-[1.9px] border-sienna aspect-square w-7 sm:w-9 h-7 sm:h-9 transition-all duration-500" />
                  <div className="absolute -bottom-0.5 -left-0.5 scale-0 group-hover:scale-125 bg-transparent border-[1.4px] sm:border-[1.9px] border-sienna aspect-square w-7 sm:w-9 h-7 sm:h-9 transition-all duration-500" />
                </div>
              ) : (
                <></>
              )}
            </div>
            <span className="sm:text-lg text-charcoal-3/80 group-hover:text-sienna transition-colors duration-300">
              {label}
            </span>
          </Link>
        ))}
    </div>
  );
}
