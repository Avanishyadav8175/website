"use client";

// utils
import { memo, useMemo } from "react";

// hooks
import { useEffect, useState } from "react";

// components
import ContentGalleryImage from "./components/ContentGalleryImage";
import ContentGalleryPreviews from "./components/ContentGalleryPreviews";
import ContentGallerySimilarContentDrawer from "./components/ContentGallerySimilarContentDrawer";

// types
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type ImageDocument } from "@/common/types/documentation/media/image";

function ContentGallery({
  serviceImage,
  images,
  showSimilarContentDrawer,
  similarContents,
  tag,
  onClickViewSimilar,
  onChangeShowSimilarContentDrawer
}: {
  serviceImage?: ImageDocument;
  images: ImageDocument[];
  showSimilarContentDrawer: boolean;
  similarContents: ContentDocument[];
  tag?: { label: string; color: string };
  onClickViewSimilar?: () => void;
  onChangeShowSimilarContentDrawer: (showSimilarContentDrawer: boolean) => void;
}) {
  // states
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // variables
  const finalImages = useMemo(
    () => (serviceImage ? [...images, serviceImage] : images),
    [serviceImage, images]
  );

  // side effects
  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  return (
    <>
      <section className="lg:sticky lg:top-7 grid grid-cols-1 lg:grid-cols-[80px_auto] gap-3 lg:gap-4 items-start justify-stretch">
        <ContentGalleryPreviews
          activeIndex={activeIndex}
          images={finalImages}
          onChangeActiveIndex={setActiveIndex}
        />
        <ContentGalleryImage
          activeIndex={activeIndex}
          images={finalImages}
          tag={tag}
          onChangeActiveIndex={setActiveIndex}
          onClickViewSimilar={onClickViewSimilar}
        />
      </section>
      <ContentGallerySimilarContentDrawer
        showDrawer={showSimilarContentDrawer}
        contents={similarContents}
        onChangeShowDrawer={onChangeShowSimilarContentDrawer}
      />
    </>
  );
}

export default memo(ContentGallery);
