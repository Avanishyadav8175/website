
"use client";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";
import { BannerCarouselType } from "./static/types";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";
import Banner, { CategoryListBanner } from "./Banner/Banner";
import Image from "next/image";
import { BasicImageType } from "@/common/types/types";
import { SetStateType } from "@/common/types/reactTypes";
import Link from "next/link";
import { OPTIMIZE_IMAGE } from "@/config/image";

const manageCarouselCount = ({
  countManager,
  setCurrIndex
}: {
  countManager: CarouselApi;
  setCurrIndex: SetStateType<number>;
}) => {
  if (!countManager) return;

  setCurrIndex((prev) => countManager.selectedScrollSnap());

  countManager.on("select", () => {
    setCurrIndex((prev) => countManager.selectedScrollSnap());
  });
};

export function HomepageBannerCarousel(config: BannerCarouselType) {
  const plugin = useRef(
    Autoplay({
      delay: 7000,
      stopOnInteraction: true
    })
  );
  const [countManager, setCountManager] = useState<CarouselApi>();
  const [currIndex, setCurrIndex] = useState<number>(0);

  useEffect(
    () => manageCarouselCount({ countManager, setCurrIndex }),
    [countManager]
  );

  const showBubbles = config.showBubbles || false;

  return (
    <Carousel
      plugins={config.autoScroll ? [plugin.current] : undefined}
      className="grid *:row-start-1 *:col-start-1"
      opts={{
        loop: true
      }}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      setApi={setCountManager}
    >
      <CarouselContent className="z-10">
        {config.elements.map((el, index) => (
          <CarouselItem
            className="overflow-hidden max-sm:aspect-[2/1]"
            key={index}
          >
            <Banner props={el} />
          </CarouselItem>
        ))}
      </CarouselContent>
      {showBubbles ? (
        <div className="z-20 h-fit w-fit relative left-1/2 -translate-x-1/2 flex items-center justify-center self-end gap-2 sm:gap-3">
          {Array.from({ length: config.elements.length }).map((_, index) => (
            <div
              key={index}
              className={`h-1.5 sm:h-2 mb-2 rounded-full ${index === currIndex ? "aspect-[2.5/1] bg-charcoal-3/50" : "aspect-square bg-charcoal-3/20"} cursor-pointer backdrop-blur-md transition-all duration-300`}
              onClick={() => {}}
            />
          ))}
        </div>
      ) : (
        <></>
      )}
    </Carousel>
  );
}

export default function BannerCarousel(config: BannerCarouselType) {
  const plugin = useRef(
    Autoplay({
      delay: 7000,
      stopOnInteraction: true
    })
  );
  const [countManager, setCountManager] = useState<CarouselApi>();
  const [currIndex, setCurrIndex] = useState<number>(0);

  useEffect(
    () => manageCarouselCount({ countManager, setCurrIndex }),
    [countManager]
  );

  const showBubbles = config.showBubbles || false;

  return (
    <Carousel
      plugins={config.autoScroll ? [plugin.current] : undefined}
      className="w-full h-fit sm:rounded-3xl grid *:row-start-1 *:col-start-1"
      opts={{
        loop: true
      }}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      setApi={setCountManager}
    >
      <CarouselContent className="min-h-fit z-10">
        {config.elements.map((el, index) => (
          <CarouselItem
            key={index}
            className="h-[180px] min-[450px]:h-[250px] md:h-[320px] z-10"
          >
            <Banner props={el} />
          </CarouselItem>
        ))}
      </CarouselContent>
      {showBubbles ? (
        <div className="z-20 h-fit w-fit relative left-1/2 -translate-x-1/2 flex items-center justify-center self-end gap-3">
          {Array.from({ length: config.elements.length }).map((_, index) => (
            <div
              key={index}
              className={`h-2 sm:h-2 mb-1.5 rounded-full ${index === currIndex ? "aspect-[2.5/1] bg-charcoal-3/50" : "aspect-square bg-charcoal-3/20"} cursor-pointer backdrop-blur-md transition-all duration-300`}
              onClick={() => {}}
            />
          ))}
        </div>
      ) : (
        <></>
      )}
    </Carousel>
  );
}

export function ProductBannerCarousel({
  images,
  activeIndex,
  setActiveIndex
}: {
  images: BasicImageType[];
  activeIndex: number;
  setActiveIndex: SetStateType<number>;
}) {
  const [countManager, setCountManager] = useState<CarouselApi>();
  const [currIndex, setCurrIndex] = useState<number>(activeIndex || 0);

  useEffect(
    () => manageCarouselCount({ countManager, setCurrIndex }),
    [countManager]
  );

  useEffect(
    () => setActiveIndex((prev) => currIndex),
    [currIndex, setActiveIndex]
  );

  return (
    <Carousel
      className="w-full h-full max-sm:[mask-image:linear-gradient(white_100%,transparent)] "
      opts={{
        loop: true
      }}
      setApi={setCountManager}
    >
      <CarouselContent>
        {images.map(({ url, alt }, index) => (
          <CarouselItem
            key={index}
            className="w-full h-full grid place-items-center"
          >
            <Image
              src={url}
              alt={alt}
              width={600}
              height={600}
              quality={75}
              unoptimized={!OPTIMIZE_IMAGE}
              draggable={false}
              className="w-full h-full object-cover object-center cursor-pointer sm:rounded-xl"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export function CategoryListBannerCarousel({
  config
}: {
  config: BannerCarouselType;
}) {
  const [countManager, setCountManager] = useState<CarouselApi>();
  const [currIndex, setCurrIndex] = useState<number>(0);

  useEffect(
    () => manageCarouselCount({ countManager, setCurrIndex }),
    [countManager]
  );

  const showBubbles = config.showBubbles || true;

  return (
    <Carousel
      className="w-full h-fit sm:rounded-3xl grid *:row-start-1 *:col-start-1 my-1 z-[850]"
      opts={{
        loop: true
      }}
      setApi={setCountManager}
    >
      <CarouselContent className="min-h-fit z-10">
        {config.elements.map((el, index) => (
          <CarouselItem
            key={index}
            className=" z-10"
          >
            <CategoryListBanner {...el} />
          </CarouselItem>
        ))}
      </CarouselContent>
      {showBubbles ? (
        <div className="z-20 h-fit w-fit relative left-1/2 -translate-x-1/2 flex items-center justify-center self-end gap-3">
          {Array.from({ length: config.elements.length }).map((_, index) => (
            <div
              key={index}
              className={`h-2 sm:h-2 mb-1.5 rounded-full ${index === currIndex ? "aspect-[2.5/1] bg-charcoal-3/50" : "aspect-square bg-charcoal-3/20"} cursor-pointer backdrop-blur-md transition-all duration-300`}
              onClick={() => {}}
            />
          ))}
        </div>
      ) : (
        <></>
      )}
    </Carousel>
  );
}

export function BlogBannerCarousel({
  banners
}: {
  banners: Array<{ image: BasicImageType; link: string; title: string }>;
}) {
  const plugin = useRef(
    Autoplay({
      delay: 7000,
      stopOnInteraction: true
    })
  );
  const [countManager, setCountManager] = useState<CarouselApi>();
  const [currIndex, setCurrIndex] = useState<number>(0);

  useEffect(
    () => manageCarouselCount({ countManager, setCurrIndex }),
    [countManager]
  );

  const showBubbles = true;

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full h-fit sm:rounded-3xl grid *:row-start-1 *:col-start-1"
      opts={{
        loop: true
      }}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      setApi={setCountManager}
    >
      <CarouselContent className="min-h-fit z-10 rounded-2xl">
        {banners.map(({ link, image: { alt, url }, title }, index) => (
          <CarouselItem key={index}>
            <Link
              href={link}
              className="group h-[180px] cursor-pointer min-[450px]:h-[250px] md:h-[320px] z-10 grid *:row-start-1 *:col-start-1 rounded-2xl overflow-hidden"
              // prefetch
            >
              <Image
                src={url}
                alt={alt || "Banner Image"}
                width={1200}
                height={700}
                decoding="async"
                unoptimized={!OPTIMIZE_IMAGE}
                className="w-full h-full object-cover object-center rounded-2xl"
              />
              <div className="w-full h-full text-white text-2xl sm:text-3xl tracking-wide font-light bg-gradient-to-t from-black/90 to-transparent to-30% rounded-2xl flex items-end justify-center p-3.5">
                <span>{title}</span>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      {showBubbles ? (
        <div className="z-20 h-fit w-fit relative left-1/2 -translate-x-1/2 translate-y-7 flex items-center justify-center self-end gap-3">
          {Array.from({ length: banners.length }).map((_, index) => (
            <div
              key={index}
              className={`h-2 sm:h-2 mb-1.5 rounded-full ${index === currIndex ? "aspect-[2.5/1] bg-charcoal-3/50" : "aspect-square bg-charcoal-3/20"} cursor-pointer backdrop-blur-md transition-all duration-300`}
              onClick={() => {}}
            />
          ))}
        </div>
      ) : (
        <></>
      )}
    </Carousel>
  );
}
