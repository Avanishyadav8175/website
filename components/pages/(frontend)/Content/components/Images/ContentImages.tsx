"use client";

// config
import { OPTIMIZE_IMAGE } from "@/config/image";

import { IS_MOBILE } from "@/common/constants/mediaQueries";
import { BasicImageType } from "@/common/types/types";
import { ProductBannerCarousel } from "@/components/(frontend)/global/_Templates/BannerCarousel/BannerCarousel";
import { DrawerTrigger } from "@/components/ui/drawer";
import {
  ArrowLeft,
  GalleryHorizontalEndIcon,
  ImageOffIcon
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useRouter } from "next/navigation";

export default function ProductImages({
  images,
  viewSimilar,
  onSimilarProductsClick
}: {
  images: BasicImageType[];
  viewSimilar: boolean;
  onSimilarProductsClick: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState<number>(
    images && images.length ? 0 : -1
  );
  const isMobile = useMediaQuery(IS_MOBILE);
  const { back } = useRouter();

  return (
    <div className="sm:sticky sm:top-7 grid grid-cols-1 sm:grid-cols-[80px_auto] gap-3 sm:gap-4 items-start justify-stretch">
      {/* SIDE MINI THUMBNAILS OF OTHER IMAGES ============================= */}
      <div className="hidden sm:flex sm:flex-col gap-3 sm:gap-4 *:aspect-square *:max-sm:w-20 *:bg-ash max-sm:overflow-x-scroll scrollbar-hide">
        {images && images.length ? (
          images.map(({ alt, url }, index) => (
            <div
              className="group grid *:row-start-1 *:col-start-1 cursor-pointer rounded-lg"
              key={index}
              onClick={() => setActiveIndex((prev) => index)}
            >
              <Image
                src={url}
                alt={alt || "Content Image"}
                width={100}
                height={100}
                quality={20}
                unoptimized={!OPTIMIZE_IMAGE}
                priority
                draggable={false}
                className={`w-full h-full object-cover object-center cursor-pointer border-[2px] ${index === activeIndex ? "border-sienna" : "border-transparent"} transition-all duration-300 rounded-lg`}
              />
              <div
                className={`${index === activeIndex ? "bg-sienna -rotate-[10deg]" : "bg-ash-3/60 group-hover:-rotate-[10deg] brightness-75"} transition-all duration-300 -z-20 rounded-lg`}
              />
            </div>
          ))
        ) : (
          <></>
        )}
      </div>

      {/* MAIN IMAGE ON DISPLAY =========================================== */}
      <div className="flex flex-col justify-start relative">
        <div className="relative aspect-square max-sm:row-start-1 overflow-hidden grid place-items-center sm:rounded-xl">
          {images && images.length ? (
            <ProductBannerCarousel
              images={images}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          ) : (
            <div className="text-charcoal-3/60 flex flex-col items-center justify-center gap-2.5">
              <ImageOffIcon
                width={40}
                height={40}
              />
              <span>No image to preview</span>
            </div>
          )}

          {/* VIEW SIMILAR ------------------------------------ */}
          {viewSimilar ? (
            isMobile ? (
              <DrawerTrigger>
                <ViewSimilar onSimilarProductsClick={() => {}} />
              </DrawerTrigger>
            ) : (
              <ViewSimilar onSimilarProductsClick={onSimilarProductsClick} />
            )
          ) : (
            <></>
          )}
        </div>

        {/* BACK BUTTON FOR MOBILE ========================= */}
        <div
          className="sm:hidden absolute top-2 left-2 rounded-full aspect-square p-1.5 bg-black/15 backdrop-blur-sm text-white cursor-pointer transition-all duration-300 hover:bg-black/70"
          onClick={back}
        >
          <ArrowLeft />
        </div>
        {/* BUBBLE INDICATORS OF IMAGE INDEX ========================= */}
        {images.length > 1 ? (
          <div className="flex items-center justify-end max-sm:pr-5 gap-2 sm:gap-1.5 mt-2 max-sm:-mb-2 sm:my-2 -translate-y-8 w-fit absolute max-sm:right-0 max-sm:-bottom-2 sm:left-3.5 sm:-bottom-5">
            {Array.from({ length: images.length }).map((_, index) => (
              <span
                key={index}
                className={`rounded-full h-1.5 sm:h-2 ${index === activeIndex ? "bg-white shadow-md aspect-[2.5/1]" : "bg-ash sm:bg-ash-3 aspect-square hover:bg-charcoal-3/70"} cursor-pointer transition-all duration-300`}
                onClick={() => setActiveIndex((prev) => index)}
              />
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

const ViewSimilar = ({
  onSimilarProductsClick
}: {
  onSimilarProductsClick: () => void;
}) => <></>;

// (
//   <div
//     className="group absolute bottom-2 left-4 sm:right-1.5 sm:bottom-2 grid *:row-start-1 *:col-start-1 place-items-center sm:justify-end cursor-pointer z-[300]"
//     onClick={onSimilarProductsClick}
//   >
//     <div className="max-sm:-translate-x-2 rounded-full p-2 px-3.5 max-sm:text-white bg-charcoal-3/45 sm:bg-white backdrop-blur-sm flex items-center justify-start gap-2 group-hover:sm:bg-ivory-2 sm:shadow-xl transition-all duration-300 overflow-hidden text-sm">
//       <GalleryHorizontalEndIcon
//         strokeWidth="2"
//         width={17}
//         height={17}
//       />
//       <div>View Similar</div>
//     </div>
//   </div>
// );
