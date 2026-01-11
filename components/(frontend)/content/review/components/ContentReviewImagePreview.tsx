// config
import { OPTIMIZE_IMAGE } from "@/config/image";

// icons
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

// utils
import { memo, useMemo } from "react";

// components
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";

// types
import { type ImageDocument } from "@/common/types/documentation/media/image";

function ContentReviewImagePreview({
  showPreview,
  images,
  activeIndex,
  onChangeShowPreview,
  onChangeActiveIndex
}: {
  showPreview: boolean;
  activeIndex: number;
  images: ImageDocument[];
  onChangeShowPreview: (showPreview: boolean) => void;
  onChangeActiveIndex: (activeIndex: number) => void;
}) {
  const activeImage = useMemo(() => images[activeIndex], [images, activeIndex]);

  return (
    <Dialog
      open={showPreview}
      onOpenChange={onChangeShowPreview}
    >
      <DialogContent className="p-0 bg-transparent rounded-none focus:outline-none outline-none border-none min-w-fit">
        <div className="p-6 rounded-3xl bg-white flex flex-col-reverse sm:max-h-[calc(80dvh_+_30px)] sm:grid sm:grid-cols-[90px_auto] gap-[12px] sm:min-w-[550px] sm:w-[calc(80dvh_+_132px)] outline-none">
          <div className="flex max-sm:max-w-[85dvw] sm:flex-col sm:items-stretch justify-start overflow-x-scroll sm:overflow-y-scroll scrollbar-hide sm:h-[80dvh] gap-[10px] *:relative *:h-[90px] *:rounded-2xl *:overflow-hidden *:flex *:items-center *:justify-center *:cursor-pointer *:max-sm:min-w-[68px]">
            {images.map(({ _id, alt, defaultAlt, url }, index) => (
              <div
                key={_id as string}
                onClick={() => {
                  onChangeActiveIndex(index);
                }}
                className={`border-[2.5px] aspect-square sm:w-[90px] sm:h-[90px] ${index === activeIndex ? " border-sienna" : "border-transparent"}`}
              >
                <Image
                  src={url}
                  alt={alt || defaultAlt || "Review Image"}
                  className="object-center w-full h-full object-cover"
                  height={100}
                  width={100}
                  quality={25}
                  unoptimized={!OPTIMIZE_IMAGE}
                  priority
                  draggable={false}
                />
              </div>
            ))}
          </div>
          <div className="aspect-square max-sm:min-w-[80dvw] sm:min-h-[80dvh] rounded-3xl overflow-hidden flex items-center justify-center relative">
            <Image
              src={activeImage.url}
              alt={activeImage.alt || activeImage.defaultAlt || "Review Image"}
              className="object-center w-full h-full object-cover"
              height={1200}
              width={1200}
              quality={75}
              unoptimized={!OPTIMIZE_IMAGE}
              draggable={false}
            />
            <div
              className="rounded-full bg-transparent text-white p-[10px] transition-all duration-300 cursor-pointer hover:bg-black/40 absolute top-1/2 -translate-y-1/2 left-[5px]"
              onClick={() =>
                onChangeActiveIndex(
                  (activeIndex - 1 < 0 ? images.length - 1 : activeIndex - 1) %
                    images.length
                )
              }
            >
              <ChevronLeftIcon
                width={20}
                height={20}
                strokeWidth={10}
              />
            </div>
            <div
              className="rounded-full bg-transparent text-white p-[10px] transition-all duration-300 cursor-pointer hover:bg-black/40 absolute top-1/2 -translate-y-1/2 right-[5px]"
              onClick={() => {
                onChangeActiveIndex((activeIndex + 1) % images.length);
              }}
            >
              <ChevronRightIcon
                width={20}
                height={20}
                strokeWidth={10}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default memo(ContentReviewImagePreview);
