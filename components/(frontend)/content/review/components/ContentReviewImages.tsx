// utils
import { lazy, memo } from "react";

// hooks
import { useCallback, useMemo, useState } from "react";
import { useWindowSize } from "usehooks-ts";

// components
import ContentReviewImage from "./ContentReviewImage";
const LazyContentReviewImagePreview = lazy(
  () => import("./ContentReviewImagePreview")
);
import { Suspense } from "react";

// types
import { type ImageDocument } from "@/common/types/documentation/media/image";

function ContentReviewImages({ images }: { images: ImageDocument[] }) {
  // hooks
  const { width } = useWindowSize();

  // states
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // variables
  const imageCount = useMemo(() => images.length, [images]);
  const imageLimit = useMemo(() => (width > 640 ? 9 : 3), [width]);

  // event handlers
  const handleClick = useCallback((index: number) => {
    setShowPreview(true);
    setActiveIndex(index);
  }, []);

  return (
    <div>
      <div
        className={`max-[1210px]:px-4 w-full mb-[14px] grid gap-4 sm:gap-[10px] grid-cols-3 min-[450px]:grid-cols-6 sm:grid-cols-2 min-[1100px]:grid-cols-3`}
      >
        {images.slice(0, imageLimit).map((image, i) => (
          <ContentReviewImage
            key={image._id as string}
            image={image}
            showMore={imageCount > imageLimit && i === imageLimit - 1}
            moreCount={imageCount - imageLimit + 1}
            onClick={() => {
              handleClick(i);
            }}
          />
        ))}
      </div>
      <Suspense fallback={<></>}>
        <LazyContentReviewImagePreview
          showPreview={showPreview}
          activeIndex={activeIndex}
          images={images}
          onChangeShowPreview={setShowPreview}
          onChangeActiveIndex={setActiveIndex}
        />
      </Suspense>
    </div>
  );
}

export default memo(ContentReviewImages);
