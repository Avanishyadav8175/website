"use client";

// libraries
import Autoplay from "embla-carousel-autoplay";

// utils
import { memo } from "react";

// hooks
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// components
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";
import CategoryBannerImage from "./CategoryBannerImage";

// types
import { type BannerDocument } from "@/common/types/documentation/nestedDocuments/banner";

function CategoryBanner({
  banner: {
    type,
    autoScroll,
    scrollInterval,
    loopInfinitely,
    showIndicators,
    images
  }
}: {
  banner: BannerDocument;
}) {
  // references
  const plugin = useRef(
    Autoplay({
      delay: scrollInterval * 1000 || 7000,
      stopOnInteraction: true
    })
  );

  // states
  const [countManager, setCountManager] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // memoizes
  const dimensions = useMemo(
    () =>
      type === "large"
        ? "aspect-[3/2]"
        : type === "micro"
          ? "h-[90px]"
          : type === "mini"
            ? "h-[150px] scale-110"
            : type === "square"
              ? "aspect-[1/1]"
              : "min-h-[68px]",
    [type]
  );

  // utils
  const manageCarouselCount = useCallback(
    ({
      countManager,
      onChangeActiveIndex
    }: {
      countManager: CarouselApi;
      onChangeActiveIndex: (activeIndex: number) => void;
    }) => {
      if (countManager) {
        onChangeActiveIndex(countManager.selectedScrollSnap());

        countManager.on("select", () => {
          onChangeActiveIndex(countManager.selectedScrollSnap());
        });
      }
    },
    []
  );

  // side effects
  useEffect(() => {
    manageCarouselCount({ countManager, onChangeActiveIndex: setActiveIndex });
  }, [manageCarouselCount, countManager]);

  return (
    <div className="py-2 max-sm:px-3.5">
      <Carousel
        plugins={autoScroll ? [plugin.current] : undefined}
        className="grid *:row-start-1 *:col-start-1"
        opts={{
          loop: loopInfinitely
        }}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        setApi={setCountManager}
      >
        <CarouselContent className="z-10">
          {images.map((image, i) => (
            <CarouselItem
              key={i}
              className={`overflow-hidden ${dimensions}`}
            >
              <CategoryBannerImage bannerImage={image} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {showIndicators && (
          <div className="z-20 h-fit w-fit relative left-1/2 -translate-x-1/2 flex items-center justify-center self-end gap-2 sm:gap-3">
            {Array.from({ length: images.length }).map((_, index) => (
              <div
                key={index}
                className={`h-1.5 sm:h-2 mb-2 rounded-full ${index === activeIndex ? "aspect-[2.5/1] bg-charcoal-3/50" : "aspect-square bg-charcoal-3/20"} cursor-pointer backdrop-blur-md transition-all duration-300`}
                onClick={() => {}}
              />
            ))}
          </div>
        )}
      </Carousel>
    </div>
  );
}

export default memo(CategoryBanner);
