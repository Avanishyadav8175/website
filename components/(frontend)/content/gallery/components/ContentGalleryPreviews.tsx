// utils
import { memo } from "react";

// components
import ContentGalleryPreview from "./ContentGalleryPreview";

// types
import { type ImageDocument } from "@/common/types/documentation/media/image";

function ContentGalleryPreviews({
  activeIndex,
  images,
  onChangeActiveIndex
}: {
  activeIndex: number;
  images: ImageDocument[];
  onChangeActiveIndex: (activeIndex: number) => void;
}) {
  return (
    <section className="hidden lg:flex lg:flex-col gap-3 lg:gap-4 *:aspect-square *:max-lg:w-20 *:bg-ash max-lg:overflow-x-scroll scrollbar-hide">
      {images.map((image, index) => (
        <ContentGalleryPreview
          key={image._id as string}
          isActive={activeIndex === index}
          image={image}
          onClick={() => {
            onChangeActiveIndex(index);
          }}
        />
      ))}
    </section>
  );
}

export default memo(ContentGalleryPreviews);
