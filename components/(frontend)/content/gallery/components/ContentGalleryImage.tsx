// icons
import { ArrowLeft } from "lucide-react";

// utils
import { memo } from "react";

// hooks
import { useRouter } from "next/navigation";

// components
import ContentGalleryCarousel from "./ContentGalleryCarousel";
import ContentGalleryViewSimilar from "./ContentGalleryViewSimilar";

// types
import { type ImageDocument } from "@/common/types/documentation/media/image";
import ContentGalleryTag from "./ContentGalleryTag";
import ContentDetailAssurance from "../../detail/components/ContentDetailAssurance";

function ContentGalleryImage({
  activeIndex,
  images,
  tag,
  onChangeActiveIndex,
  onClickViewSimilar
}: {
  activeIndex: number;
  images: ImageDocument[];
  tag?: { label: string; color: string };
  onChangeActiveIndex: (activeIndex: number) => void;
  onClickViewSimilar?: () => void;
}) {
  // hooks
  const { back } = useRouter();

  return (
    <section className="flex flex-col justify-start relative">
      <div className="relative aspect-auto max-sm:row-start-1 overflow-hidden grid place-items-center sm:rounded-2xl">
        <ContentGalleryCarousel
          images={images}
          activeIndex={activeIndex}
          onChangeActiveIndex={onChangeActiveIndex}
        />
        {onClickViewSimilar && (
          <ContentGalleryViewSimilar onClick={onClickViewSimilar} />
        )}
        {tag && (
          <ContentGalleryTag
            label={tag.label}
            color={tag.color}
          />
        )}
      </div>
      <div
        className="sm:hidden absolute top-2 left-2 rounded-full aspect-square p-1.5 bg-black/15 backdrop-blur-sm text-white cursor-pointer transition-all duration-300 hover:bg-black/70"
        onClick={back}
      >
        <ArrowLeft />
      </div>
      {images?.length && (
        <div className="flex items-center justify-end max-lg:pr-5 gap-2 lg:gap-1.5 mt-2 max-lg:-mb-2 lg:my-2 -translate-y-8 lg:-translate-y-52 w-fit absolute max-lg:-bottom-2 lg:-bottom-7 left-1/2 -translate-x-1/2">
          {Array.from({ length: images.length }).map((_, index) => (
            <span
              key={index}
              className={`rounded-full h-1.5 lg:h-2 ${index === activeIndex ? "bg-white shadow-md aspect-[2.5/1]" : "bg-ash lg:bg-ash-3 aspect-square hover:bg-charcoal-3/70"} cursor-pointer transition-all duration-300`}
              onClick={() => {
                onChangeActiveIndex(index);
              }}
            />
          ))}
        </div>
      )}

      <ContentDetailAssurance />
    </section>
  );
}

export default memo(ContentGalleryImage);
