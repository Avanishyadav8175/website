"use client";

// config
import { OPTIMIZE_IMAGE } from "@/config/image";

// utils
import { memo } from "react";

// hooks
import { useEffect, useState } from "react";

// Components
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";
import Image from "next/image";

// types
import { type CarouselApi } from "@/components/ui/carousel";
import { type ImageDocument } from "@/common/types/documentation/media/image";

function ContentGalleryCarousel({
  images,
  activeIndex,
  onChangeActiveIndex
}: {
  activeIndex: number;
  images: ImageDocument[];
  onChangeActiveIndex: (activeIndex: number) => void;
}) {
  // states
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  // hooks
  useEffect(() => {
    if (carouselApi) {
      carouselApi.scrollTo(activeIndex);
    }
  }, [activeIndex, carouselApi]);

  useEffect(() => {
    if (carouselApi) {
      onChangeActiveIndex(carouselApi.selectedScrollSnap());

      const handleSelect = () => {
        onChangeActiveIndex(carouselApi.selectedScrollSnap());
      };

      carouselApi.on("select", handleSelect);

      return () => {
        carouselApi.off("select", handleSelect);
      };
    }
  }, [carouselApi, onChangeActiveIndex]);

  return (
    <Carousel
      className="w-full h-full "
      opts={{
        loop: true
      }}
      setApi={setCarouselApi}
    >
      <CarouselContent>
        {images.map(({ url, alt }, index) => (
          <CarouselItem
            key={index}
            className="w-full h-full sm:h-fit lg:h-full grid place-items-center"
          >
            <Image
              src={url}
              alt={alt}
              width={400}
              height={400}
              unoptimized={!OPTIMIZE_IMAGE}
              quality={75}
              priority={!index}
              draggable={false}
              className="w-fit h-fit object-cover object-center cursor-pointer sm:rounded-xl"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default memo(ContentGalleryCarousel);
